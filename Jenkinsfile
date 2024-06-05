pipeline {
    agent any

    environment {
        BACK_DOCKER_IMAGE_NAME = 'backend/django'
        DOCKERFILE_PATH = './backend/Dockerfile'
        BACK_CONTAINER_NAME = 'django-server'

        FRONT_DOCKER_IMAGE_NAME='frontend/react'
        FRONT_CONTAINER_NAME='react-client'

        AI_DOCKER_IMAGE_NAME='backend/flask'
        AI_CONTAINER_NAME='flask-server'

        DATABASE_NAME='mariadb'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Copy my_settings file'){
            steps{
                script {
                    sh '''
                        cp /var/jenkins_home/settingsFiles/my_settings.py ./backend/my_settings.py
                    '''
                }           
            }

        }

        stage('Parallel Build Docker Image') {
            parallel{
                stage('front Build Docker Image'){
                    steps {
                        script {
                            sh '''
                                cd ./frontend/fubao-app-pwa
                                docker build -t ${FRONT_DOCKER_IMAGE_NAME} .
                            '''
                        }
                    }
                }


                stage('back Build Docker Image'){
                    steps {
                        script {
                            sh '''
                                cd ./backend
                                docker build -t ${BACK_DOCKER_IMAGE_NAME} .
                            '''
                        }
                    }
                }


                stage('ai Build Docker Image'){
                    steps {
                        script {
                            sh '''
                                cd ./fish_classification
                                docker build -t ${AI_DOCKER_IMAGE_NAME} .
                            '''
                        }
                    }
                }

                
            }

        }

        stage('Delete Previous Docker Container') {
            parallel{
                stage('Delete Previous Front Docker Container'){
                    steps {
                        script {
                            def frontContainerExists = sh(script: "docker ps -a --filter name=${FRONT_CONTAINER_NAME}", returnStatus: true) == 0
                            if (frontContainerExists) {
                                sh "docker stop ${FRONT_CONTAINER_NAME}"
                                sh "docker rm ${FRONT_CONTAINER_NAME}"
                            } else {
                                echo "Frontend container does not exist. Skipping deletion."
                            }
                        }
                    }

                }

                stage('Delete Previous back Docker Container'){
                    steps {
                        script {
                            def backContainerExists = sh(script: "docker ps -a --filter name=${BACK_CONTAINER_NAME}", returnStatus: true) == 0
                            if (backContainerExists) {
                                sh "docker stop ${BACK_CONTAINER_NAME}"
                                sh "docker rm ${BACK_CONTAINER_NAME}"
                            } else {
                                echo "Backend container does not exist. Skipping deletion."
                            }
                        }
                    }

                }

                stage('Delete Previous AI Docker Container'){
                    steps {
                        script {
                            def aiContainerExists = sh(script: "docker ps -a --filter name=${AI_CONTAINER_NAME}", returnStatus: true) == 0
                            if (aiContainerExists) {
                                sh "docker stop ${AI_CONTAINER_NAME}"
                                sh "docker rm ${AI_CONTAINER_NAME}"
                            } else {
                                echo "AI container does not exist. Skipping deletion."
                            }
                        }
                    }

                }
            }

        }

        stage('Parallel Run Docker Container') {
            parallel{
                stage('Run Front Docker Contatiner'){
                    steps {
                        script {
                            sh "docker run -d --name ${FRONT_CONTAINER_NAME} -p 3000:3000 ${FRONT_DOCKER_IMAGE_NAME}"
                        }
                    }
                }

                stage('Run Back Docker Contatiner'){
                    steps {
                        script {
                            sh "docker run -d --link ${DATABASE_NAME} --name ${BACK_CONTAINER_NAME} -p 8000:8000 ${BACK_DOCKER_IMAGE_NAME}"
                        }
                    }
                }

                stage('Run AI Docker Contatiner'){
                    steps {
                        script {
                            sh "docker run -d --link ${DATABASE_NAME} --name ${AI_CONTAINER_NAME} -p 5000:5000 ${AI_DOCKER_IMAGE_NAME}"
                        }
                    }
                }
                

            }
        }
    }
}