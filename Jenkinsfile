pipeline {
    agent any
    
    tools {
        // Asegúrate de que este nombre coincida con "Manage Jenkins" -> "Global Tool Configuration"
        nodejs 'NodeJS 24' 
    }
    
    environment {
        // ID de la credencial del token de SonarQube que creaste previamente
        SONAR_TOKEN = credentials('sonar-token')
    }
    
    stages {
        stage('Checkout') {
            steps {
                // Actualizado a tu nuevo repositorio
                git branch: 'main', url: 'https://github.com/Yourchh/Calculadora.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                // 'SonarQube' es el nombre del servidor en "Configure System"
                withSonarQubeEnv('SonarQube') {
                    script {
                        // 'SonarQube Scanner' es el nombre en Global Tool Configuration
                        def scannerHome = tool name: 'SonarQube Scanner'
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 1, unit: 'HOURS') {
                    // Espera la respuesta de SonarQube para aprobar o fallar el build
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
    }
}