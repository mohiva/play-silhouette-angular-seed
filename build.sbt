import com.tuplejump.sbt.yeoman.Yeoman
import com.typesafe.sbt.SbtScalariform._
import scalariform.formatter.preferences._
import play.PlayScala

//********************************************************
// Play settings
//********************************************************

name := "play-silhouette-angular-seed"

version := "0.1"

scalaVersion := "2.11.2"

resolvers += Resolver.sonatypeRepo("snapshots")

libraryDependencies ++= Seq(
  "com.mohiva" %% "play-silhouette" % "2.0-SNAPSHOT",
  "org.webjars" % "angularjs" % "1.3.0-beta.2",
  "org.webjars" % "requirejs" % "2.1.11-1",
  "org.webjars" %% "webjars-play" % "2.3.0",
  "org.webjars" % "bootstrap" % "3.1.1",
  "org.webjars" % "jquery" % "1.11.0",
  "net.codingwell" %% "scala-guice" % "4.0.0-beta4",
  cache
)

lazy val root = (project in file(".")).enablePlugins(PlayScala)

//********************************************************
// Yeoman settings
//********************************************************
Yeoman.yeomanSettings

//********************************************************
// Scalariform settings
//********************************************************

defaultScalariformSettings

ScalariformKeys.preferences := ScalariformKeys.preferences.value
  .setPreference(FormatXml, false)
  .setPreference(DoubleIndentClassDeclaration, false)
  .setPreference(PreserveDanglingCloseParenthesis, true)
