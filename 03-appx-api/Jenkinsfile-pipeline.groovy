pipeline {
    agent any

    stages {
        stage('Checkout') {     
            steps {
                echo 'Checkout SCM Jobs Project'
            }
        }

        stage('SonarQube Analysis') { 
            steps {
                echo 'SonarQube Analysis'
            }
        }

        stage('Docker Build') {    
            steps {
                echo 'Building Docker Image'
            }
        }

        stage('Docker Push') {      
            steps {
                echo 'Pushing Docker Image'
            }
        }
        
        stage('Restart Deployment') { 
            steps {
                echo 'Restarting Deployment'
            }
        }
    }
}
