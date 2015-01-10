import com.tuplejump.sbt.yeoman.Yeoman
import com.typesafe.sbt.SbtScalariform._
import scalariform.formatter.preferences._
import play.PlayScala

//********************************************************
// Play settings
//********************************************************

name := "play-silhouette-angular-seed"

version := "0.1"

scalaVersion := "2.11.4"

resolvers := ("Atlassian Releases" at "https://maven.atlassian.com/public/") +: resolvers.value

resolvers += Resolver.sonatypeRepo("snapshots")

libraryDependencies ++= Seq(
  "com.mohiva" %% "play-silhouette" % "2.0-SNAPSHOT",
  "net.codingwell" %% "scala-guice" % "4.0.0-beta4",
  cache
)

lazy val root = (project in file(".")).enablePlugins(PlayScala)

//********************************************************
// Yeoman settings
//********************************************************
Yeoman.yeomanSettings

Yeoman.forceGrunt := false

//********************************************************
// Scalariform settings
//********************************************************

defaultScalariformSettings

ScalariformKeys.preferences := ScalariformKeys.preferences.value
  .setPreference(FormatXml, false)
  .setPreference(DoubleIndentClassDeclaration, false)
  .setPreference(PreserveDanglingCloseParenthesis, true)
