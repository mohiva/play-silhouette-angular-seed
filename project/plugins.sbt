// Comment to get more information during initialization
logLevel := Level.Warn

// The Typesafe repository
resolvers += "Typesafe repository" at "http://repo.typesafe.com/typesafe/releases/"

// The Sonatype repository
resolvers += Resolver.sonatypeRepo("snapshots")

// Use the Play sbt plugin for Play projects
addSbtPlugin("com.typesafe.play" % "sbt-plugin" % "2.3.4")

// The Yeoman plugin
addSbtPlugin("com.tuplejump" % "sbt-yeoman" % "0.7.1-SNAPSHOT")

// Use the sbt IDEA plugin for Play projects
addSbtPlugin("com.github.mpeltonen" % "sbt-idea" % "1.7.0-SNAPSHOT")

// Use the Scalariform plugin to reformat the code
addSbtPlugin("com.typesafe.sbt" % "sbt-scalariform" % "1.3.0")

// Use sbt web plugins
addSbtPlugin("com.typesafe.sbt" % "sbt-web" % "1.0.0")

addSbtPlugin("com.typesafe.sbt" % "sbt-rjs" % "1.0.4")

addSbtPlugin("com.typesafe.sbt" % "sbt-digest" % "1.0.0")

addSbtPlugin("com.typesafe.sbt" % "sbt-gzip" % "1.0.0")
