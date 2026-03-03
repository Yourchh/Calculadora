pipeline {
    agent any
    
    tools {
        // Asegúrate de que este nombre coincida con "Manage Jenkins" -> "Global Tool Configuration"
        nodejs 'nodejs' 
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
        withSonarQubeEnv('SonarQube') {
            script {
                // Cambiamos 'SonarQube Scanner' por 'sonar-scanner'
                // para que coincida con tu captura image_b55d26.jpg
                def scannerHome = tool name: 'sonar-scanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
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