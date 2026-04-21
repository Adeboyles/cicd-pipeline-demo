# CI/CD Pipeline Demo

A full end-to-end CI/CD pipeline that automatically builds, pushes, and deploys a Node.js application to AWS EC2 on every push to the main branch. No manual deployment steps required.

## What It Does

Every time code is pushed to the `main` branch, the following happens automatically:

1. GitHub Actions triggers the pipeline
2. The Node.js app is packaged into a Docker image
3. The image is pushed to DockerHub
4. GitHub Actions SSHes into the AWS EC2 server
5. The old container is stopped and removed
6. The new container is pulled and started

The entire process takes under 60 seconds from push to live deployment.

---

## Architecture

```
Developer pushes code
        │
        ▼
   GitHub (main)
        │
        ▼
GitHub Actions Workflow
        │
        ├──► Build Docker Image
        │
        ├──► Push to DockerHub
        │
        └──► SSH into EC2
                  │
                  ├──► Pull latest image
                  ├──► Stop old container
                  └──► Run new container
                            │
                            ▼
                     App live on EC2:3000
```

---

## Tech Stack

| Tool | Purpose |
|---|---|
| Node.js + Express | Application |
| Docker | Containerization |
| DockerHub | Container registry |
| GitHub Actions | CI/CD automation |
| AWS EC2 (Ubuntu 24.04) | Cloud server |

---

## Project Structure

```
cicd-pipeline-demo/
├── app.js                        # Express application
├── package.json                  # Node.js dependencies
├── Dockerfile                    # Container build instructions
├── .dockerignore                 # Files excluded from Docker build
└── .github/
    └── workflows/
        └── deploy.yml            # GitHub Actions CI/CD workflow
```

---

## How to Reproduce This Project

### Prerequisites
- AWS account with an EC2 instance (Ubuntu 22.04 or 24.04, t2.micro)
- DockerHub account
- GitHub account
- Docker installed on your EC2 instance

### 1. Clone the repository

```bash
git clone https://github.com/Adeboules/cicd-pipeline-demo.git
cd cicd-pipeline-demo
```

### 2. Set up EC2

Launch an Ubuntu EC2 instance and open port 3000 in the security group inbound rules. SSH in and install Docker:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ubuntu
```

### 3. Add GitHub Secrets

In your GitHub repo go to **Settings → Secrets and variables → Actions** and add the following:

| Secret | Value |
|---|---|
| `DOCKER_USERNAME` | Your DockerHub username |
| `DOCKER_PASSWORD` | Your DockerHub access token |
| `EC2_HOST` | Your EC2 public IP address |
| `EC2_USER` | `ubuntu` |
| `EC2_SSH_KEY` | Contents of your `.pem` private key file |

### 4. Push to main

Any push to the `main` branch will trigger the full pipeline automatically.

```bash
git add .
git commit -m "your message"
git push
```

### 5. Access the app

Once the pipeline completes, visit:

```
http://YOUR_EC2_PUBLIC_IP:3000
```

---

## Pipeline in Action

The Actions tab shows every deployment run with build time and status. Each commit to `main` creates a new run automatically.

---

## Key Concepts Demonstrated

- **Containerization** — the app runs inside a Docker container, making it portable and environment-independent
- **CI/CD automation** — zero manual deployment steps; the pipeline handles everything on every push
- **Infrastructure on AWS** — real cloud server hosting a live application
- **Secrets management** — credentials stored securely in GitHub Secrets, never hardcoded
- **Docker image registry** — images versioned and stored on DockerHub

---

## Author

**Adeboye Oluwole**  
DevOps Engineer  
GitHub: [github.com/Adeboules](https://github.com/Adeboules)
