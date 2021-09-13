#!/usr/bin/env groovy

// NHipster ci-cd

node {
    stage('checkout') {
        checkout scm
    }

    stage('deploy') {
        sh "docker-compose -f src/main/docker/app.yml up -d"
    }
}
