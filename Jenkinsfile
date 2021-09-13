#!/usr/bin/env groovy

// NHipster ci-cd

node {
    stage('checkout') {
        checkout scm
    }



    stage('install frontend') {
        sh "npm install"
    }


    stage('install server') {
        sh "cd server && npm install"
    }

    stage('backend tests') {
        try {
            sh "cd server && npm run test"
        } catch(err) {
            throw err
        } finally {
            junit '**/server/coverage/**/*.xml'
        }
    }
    stage('frontend tests') {
        try {
            sh "npm run test"
        } catch(err) {
            throw err
        } finally {
            junit '**/target/test-results/**/TEST-*.xml'
        }
    }

/*    stage('package and deploy') {
        sh "./mvnw -ntp com.heroku.sdk:heroku-maven-plugin:2.0.5:deploy -DskipTests -Pprod -Dheroku.buildpacks=heroku/jvm -Dheroku.appName=cuckcuku"
        archiveArtifacts artifacts: '**/target/*.jar', fingerprint: true
    }
*/
%_ } }
