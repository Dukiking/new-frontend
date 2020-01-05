Jenkinsfile (Declarative Pipeline)

node {
	git url: https://www.cs.technik.fhnw.ch/bitbucket20/scm/vt341907/frontend-new.git

}

	pipeline {
		agent  { dockerfile true }
		stages {
			stage( ' Test ' ) { steps { sh ' node --version ' sh ' svn --version ' }
			}
		}
	}
