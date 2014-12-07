package utils.di

import com.google.inject.{AbstractModule, Provides}
import com.mohiva.play.silhouette.api.services.{AuthInfoService, AuthenticatorService}
import com.mohiva.play.silhouette.api.util._
import com.mohiva.play.silhouette.api.{Environment, EventBus}
import com.mohiva.play.silhouette.impl.authenticators._
import com.mohiva.play.silhouette.impl.daos.{CacheAuthenticatorDAO, DelegableAuthInfoDAO}
import com.mohiva.play.silhouette.impl.providers.CredentialsProvider
import com.mohiva.play.silhouette.impl.services.DelegableAuthInfoService
import com.mohiva.play.silhouette.impl.util._
import models.User
import models.daos._
import models.services.{UserService, UserServiceImpl}
import net.codingwell.scalaguice.ScalaModule
import play.api.Play
import play.api.Play.current

/**
 * The Guice module which wires all Silhouette dependencies.
 */
class SilhouetteModule extends AbstractModule with ScalaModule {

  /**
   * Configures the module.
   */
  def configure() {
    bind[UserService].to[UserServiceImpl]
    bind[UserDAO].to[UserDAOImpl]
    bind[DelegableAuthInfoDAO[PasswordInfo]].to[PasswordInfoDAO]
    bind[CacheLayer].to[PlayCacheLayer]
    bind[HTTPLayer].to[PlayHTTPLayer]
    bind[IDGenerator].toInstance(new SecureRandomIDGenerator())
    bind[FingerprintGenerator].toInstance(new DefaultFingerprintGenerator(false))
    bind[PasswordHasher].toInstance(new BCryptPasswordHasher)
    bind[EventBus].toInstance(EventBus())
  }

  /**
   * Provides the Silhouette environment.
   *
   * @param userService The user service implementation.
   * @param authenticatorService The authentication service implementation.
   * @param eventBus The event bus instance.
   * @return The Silhouette environment.
   */
  @Provides
  def provideEnvironment(
    userService: UserService,
    authenticatorService: AuthenticatorService[JWTAuthenticator],
    eventBus: EventBus,
    credentialsProvider: CredentialsProvider): Environment[User, JWTAuthenticator] = {

    Environment[User, JWTAuthenticator](
      userService,
      authenticatorService,
      Map(credentialsProvider.id -> credentialsProvider),
      eventBus
    )
  }

  /**
   * Provides the authenticator service.
   *
   * @param cacheLayer The cache layer implementation.
   * @param idGenerator The ID generator used to create the authenticator ID.
   * @return The authenticator service.
   */
  @Provides
  def provideAuthenticatorService(
    cacheLayer: CacheLayer,
    idGenerator: IDGenerator,
    fingerprintGenerator: FingerprintGenerator): AuthenticatorService[JWTAuthenticator] = {

    new JWTAuthenticatorService(JWTAuthenticatorSettings(
      headerName = Play.configuration.getString("silhouette.authenticator.headerName").get,
      issuerClaim = Play.configuration.getString("silhouette.authenticator.issuerClaim").get,
      encryptSubject = Play.configuration.getBoolean("silhouette.authenticator.encryptSubject").get,
      authenticatorExpiry = Play.configuration.getInt("silhouette.authenticator.authenticatorExpiry").get,
      sharedSecret = Play.configuration.getString("application.secret").get
    ), Some(new CacheAuthenticatorDAO[JWTAuthenticator](cacheLayer)), idGenerator, Clock())
  }

  /**
   * Provides the credentials provider.
   *
   * @param authInfoService The auth info service implementation.
   * @param passwordHasher The default password hasher implementation.
   * @return The credentials provider.
   */
  @Provides
  def provideCredentialsProvider(authInfoService: AuthInfoService, passwordHasher: PasswordHasher): CredentialsProvider = {
    new CredentialsProvider(authInfoService, passwordHasher, Seq(passwordHasher))
  }

  /**
   * Provides the auth info service.
   *
   * @param passwordInfoDAO The implementation of the delegable password auth info DAO.
   * @return The auth info service instance.
   */
  @Provides
  def provideAuthInfoService(passwordInfoDAO: DelegableAuthInfoDAO[PasswordInfo]): AuthInfoService = {
    new DelegableAuthInfoService(passwordInfoDAO)
  }
}
