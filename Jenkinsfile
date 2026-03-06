pipeline {
    agent any
    
    tools {
        // Debe coincidir con el nombre en "Global Tool Configuration"
        nodejs 'nodejs' 
    }
    
    environment {
        // ID de la credencial creada en Jenkins
        SONAR_TOKEN = credentials('sonar-token')
    }
    
    stages {
        stage('Clean and Install') {
            steps {
                // Limpieza preventiva y descarga de dependencias
                sh 'rm -rf node_modules package-lock.json'
                sh 'npm install --legacy-peer-deps' 
            }
        }

        stage('Security Audit') {
            steps {
                // Auditoría de vulnerabilidades en dependencias
                sh 'npm audit --audit-level=moderate || true'
            }
        }

        stage('Run Lint') {
            steps {
                // Ejecución del linter de Expo
                sh 'npm run lint || true'
            }
        }

        stage('Run Tests with Coverage') {
            steps {
                script {
                    // Ejecuta Vitest y genera junit.xml y lcov.info
                    def exitCode = sh(script: 'npm run test', returnStatus: true)
                    if (exitCode != 0) {
                        currentBuild.result = 'UNSTABLE'
                        echo "Las pruebas fallaron. Marcando build como inestable."
                    }
                }
            }
            post {
                always {
                    // Publica los resultados de las pruebas en la interfaz de Jenkins
                    script {
                        if (fileExists('junit.xml')) {
                            junit 'junit.xml'
                        }
                    }
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    script {
                        // Nombre de la herramienta según tu configuración
                        def scannerHome = tool name: 'sonar-scanner', 
                                         type: 'hudson.plugins.sonar.SonarRunnerInstallation'
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 1, unit: 'HOURS') {
                    // Espera el veredicto de SonarQube (requiere el Webhook configurado)
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Build') {
            steps {
                // Genera la exportación de la App (carpeta dist)
                sh 'npm run build || true'
            }
        }

        stage('Archive Artifacts') {
            steps {
                // Guarda los archivos compilados para descarga o despliegue
                archiveArtifacts artifacts: 'dist/**', fingerprint: true, allowEmptyArchive: true
            }
        }
    }
    
    post {
        always {
            // Limpia el espacio de trabajo del contenedor al finalizar
            cleanWs()
        }
    }
}