Jenkinsfile (Declarative Pipeline)

node {
	git url: https://www.cs.technik.fhnw.ch/bitbucket20/scm/vt341907/frontend-new.git

}

	pipeline {
		agent none
		stages {
			agent {
				docker {
					image ''
				}
			}
		}
	}

