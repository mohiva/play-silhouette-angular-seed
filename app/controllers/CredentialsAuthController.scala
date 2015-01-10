package controllers

import javax.inject.Inject

import com.mohiva.play.silhouette.api.exceptions.AuthenticationException
import com.mohiva.play.silhouette.api.services.AuthInfoService
import com.mohiva.play.silhouette.api.util.Credentials
import com.mohiva.play.silhouette.api.{Environment, LoginEvent, Silhouette}
import com.mohiva.play.silhouette.impl
import com.mohiva.play.silhouette.impl.authenticators.JWTAuthenticator
import com.mohiva.play.silhouette.impl.providers.CredentialsProvider
import models.User
import models.services.UserService
import play.api.i18n.Messages
import play.api.libs.functional.syntax._
import play.api.libs.json._
import play.api.mvc.{Action, RequestHeader}

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

/**
 * The credentials auth controller.
 *
 * @param env The Silhouette environment.
 */
class CredentialsAuthController @Inject() (
  implicit val env: Environment[User, JWTAuthenticator],
  val userService: UserService,
  val authInfoService: AuthInfoService)
  extends Silhouette[User, JWTAuthenticator] {

  /**
   * Converts the JSON into a [[impl.providers.OAuth2Info]] object.
   */
  implicit val credentialsReads = (
    (__ \ 'email).read[String] and
    (__ \ 'password).read[String]
  )(Credentials.apply _)

  /**
   * Implement this to return a result when the user is not authenticated.
   *
   * As defined by RFC 2616, the status code of the response should be 401 Unauthorized.
   *
   * @param request The request header.
   * @return The result to send to the client.
   */
  override protected def notAuthenticated(request: RequestHeader) = {
    Some(Future.successful(Unauthorized(Json.obj("message" -> Messages("invalid.credentials")))))
  }

  /**
   * Authenticates a user against the credentials provider.
   *
   * @return The result to display.
   */
  def authenticate = Action.async(parse.json) { implicit request =>
    request.body.validate[Credentials].map { credentials =>
      (env.providers.get(CredentialsProvider.ID) match {
        case Some(p: CredentialsProvider) => p.authenticate(credentials)
        case _ => Future.failed(new AuthenticationException(s"Cannot find credentials provider"))
      }).flatMap { loginInfo =>
        userService.retrieve(loginInfo).flatMap {
          case Some(user) => env.authenticatorService.create(user.loginInfo).flatMap { authenticator =>
            env.eventBus.publish(LoginEvent(user, request, request2lang))
            env.authenticatorService.init(authenticator).flatMap { token =>
              Future.successful(Ok(Json.obj("token" -> token)))
            }
          }
          case None => Future.failed(new AuthenticationException("Couldn't find user"))
        }
      }.recoverWith(exceptionHandler)
    }.recoverTotal { case error =>
      Future.successful(Unauthorized(Json.obj("message" -> Messages("invalid.credentials"))))
    }
  }
}
