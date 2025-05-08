pipeline {
    agent {
        docker {
            image 'node:18-alpine'
        }
    }
    
    stages {
        stage("git checkout"){
            steps{
                git branch: 'main' ,  url: 'https://github.com/DevOps-010/Jenkins-Varshith.git'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }
        
        stage('Build and Test with Auto-Recovery') {
            steps {
                script {
                    def maxRetries = 3
                    def retryCount = 0
                    def success = false
                    
                    while (!success && retryCount < maxRetries) {
                        try {
                            retryCount++
                            echo "Build attempt ${retryCount} of ${maxRetries}"
                            
                            sh 'npm run build'
                            sh 'npm test'
                            
                            success = true
                            echo "Build and test succeeded on attempt ${retryCount}"
                        } catch (Exception e) {
                            if (retryCount < maxRetries) {
                                echo "Build or test failed. Reason: ${e.message}"
                                echo "Waiting 30 seconds before retry..."
                                sleep 30
                            } else {
                                echo "All retry attempts exhausted. Build failed."
                                throw e
                            }
                        }
                    }
                }
            }
        }
    }
    
    post {
        always {
            archiveArtifacts artifacts: 'build-logs/**', allowEmptyArchive: true
            junit testResults: '**/test-results.xml', allowEmptyResults: true
        }
        
        success {
            echo 'Build completed successfully!'
        }
        
        failure {
            echo 'Build failed after all retry attempts!'
        }
    }
}