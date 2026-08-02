# WORKFORCE COMMAND CONSOLE – Kubernetes Production Deployment

## 🚀 Project Overview

This project demonstrates the deployment of a **React + Flask + MySQL** full-stack application on **Amazon EKS (Elastic Kubernetes Service)** using production-ready Kubernetes practices.

The application is designed for scalability, high availability, monitoring, centralized logging, and persistent storage.

---

# 🏗️ Architecture

![Uploading ChatGPT Image Aug 2, 2026, 10_48_24 AM.png…]()

---

# ☁️ AWS Services Used

* Amazon EC2
* Amazon EKS
* Amazon ECR
* Amazon RDS (MySQL)
* Amazon EBS
* AWS Application Load Balancer
* IAM
* CloudWatch

---

# 🛠️ Technologies Used

* Kubernetes
* Docker
* React.js
* Flask
* MySQL
* NGINX
* Prometheus
* Grafana
* Fluent Bit
* Helm
* AWS CLI
* eksctl
* kubectl

---

# 📂 Project Structure

```
office-k8s/
│
├── frontend/
├── backend/
├── config/
│     ├── configmap.yaml
│     ├── secret.yaml
│
├── deployment/
│     ├── frontend-deployment.yaml
│     ├── backend-deployment.yaml
│
├── service/
│
├── ingress/
│
├── hpa/
│
├── storage/
│     ├── storageclass.yaml
│     ├── pvc.yaml
│
├── monitoring/
│
├── logging/
│
└── README.md
```

---

# ⚙️ Deployment Steps

### Step 1

Infrastructure Setup

* Amazon EC2
* Amazon RDS
* Amazon EKS

---

### Step 2

Containerization

* Docker
* Docker Images

---

### Step 3

Push Images

* Amazon ECR

---

### Step 4

Deploy to Kubernetes

* Namespace
* ConfigMap
* Secret
* Deployment
* Service

---

### Step 5

Ingress

* AWS Load Balancer Controller
* Application Load Balancer

---

### Step 6

Health Checks

* Liveness Probe
* Readiness Probe

---

### Step 7

Resource Management

* CPU Requests
* Memory Requests
* CPU Limits
* Memory Limits

---

### Step 8

Auto Scaling

* Horizontal Pod Autoscaler

---

### Step 9

Monitoring

* Prometheus
* Grafana Dashboards

---

### Step 10

Persistent Storage

* Amazon EBS CSI Driver
* StorageClass
* Persistent Volume Claim (PVC)

---

### Step 11

Centralized Logging

* Fluent Bit
* Amazon CloudWatch Logs

---

# 📊 Monitoring

The following metrics are monitored using Prometheus and Grafana:

* CPU Usage
* Memory Usage
* Node Metrics
* Pod Metrics
* Disk Usage
* Application Health

---

# 📋 Logging

Application and system logs are centralized using:

* Fluent Bit
* Amazon CloudWatch

---

# 💾 Persistent Storage

Implemented using:

* Amazon EBS CSI Driver
* StorageClass
* Persistent Volume Claim (PVC)

---

# 📈 Auto Scaling

Implemented using:

* Horizontal Pod Autoscaler (HPA)

Scaling based on CPU utilization.

---

# ❤️ Health Checks

Implemented:

* Liveness Probe
* Readiness Probe

---

# 🔐 Kubernetes Resources

* Namespace
* ConfigMap
* Secret
* Deployment
* Service
* Ingress
* HPA
* StorageClass
* PVC

---

# 🎯 Key Features

* Production-ready Kubernetes deployment
* High Availability
* Auto Scaling
* Load Balancing
* Persistent Storage
* Monitoring
* Centralized Logging
* Health Checks
* Secure Configuration Management
* AWS Native Services Integration

---

# 📸 Screenshots

Add screenshots such as:

* Amazon EKS Cluster
  <img width="553" height="154" alt="image" src="https://github.com/user-attachments/assets/3d066c44-8fdb-4b28-ae27-ed1138b5f9e6" />

* Running Pods
  <img width="553" height="233" alt="image" src="https://github.com/user-attachments/assets/ad5c1011-170f-4336-ae8a-37187019f7da" />

* ALB
  <img width="553" height="96" alt="image" src="https://github.com/user-attachments/assets/a41531b9-e88f-4d73-bada-8f9f7e0e945b" />
  <img width="554" height="333" alt="image" src="https://github.com/user-attachments/assets/7b6c7bcc-50fa-44cd-81f0-228650cd937b" />


* Grafana Dashboard
  <img width="577" height="275" alt="image" src="https://github.com/user-attachments/assets/2fc1ea49-f6d6-4321-8662-ecb4bdf98e2c" />

* Prometheus Targets
  <img width="578" height="271" alt="image" src="https://github.com/user-attachments/assets/bfbdf09b-6647-4e07-ae66-8acdeee00d29" />

* CloudWatch Logs
  <img width="553" height="260" alt="image" src="https://github.com/user-attachments/assets/f6dc7f37-d247-4eb2-b015-3f1f103f2d8d" />

* Application UI
  <img width="554" height="333" alt="image" src="https://github.com/user-attachments/assets/7b6c7bcc-50fa-44cd-81f0-228650cd937b" />
  
---

# 👨‍💻 Author

**Tamilselvan S**

AWS DevOps Engineer


This README is clean, professional, and suitable for showcasing your project on GitHub to recruiters and interviewers.

