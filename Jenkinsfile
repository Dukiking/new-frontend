node {
  git url: 'https://www.cs.technik.fhnw.ch/bitbucket20/scm/vt341907/frontend-new.git'

}

pipeline {
    agent { docker { image 'node:6.3' } }
    stages {
        stage('build') {
            steps {
                sh 'git --version'
            }
        }
    }
}
