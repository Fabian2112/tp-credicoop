#FROM jenkins/jenkins:lts-djk17
#USER root
#RUN apt-get update  -y && apt-get install maven -y && rm -rf /var/lib/apt/lists/*
#USER jenkins

# se utiliza la imagen base de jenkins con jdk17
FROM jenkins/jenkins:lts-jdk17

# se cambia a usuario root para instalar los paquetes
USER root

# se actualiza el sistema y se instalan los paquetes requeridos
RUN apt-get update \
    && apt-get --yes --no-install-recommends install \
        ca-certificates \
        curl \
        fontconfig \
        git \
        git-lfs \
        less \
        netbase \
        openssh-client \
        maven \
        patch \
        tzdata \
        sudo \
        awscli \
        gnupg \
        lsb-release \
        jq

# se instala la clave GPG de Docker
RUN install -m 0755 -d /etc/apt/keyrings \
    && curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg \
    && chmod a+r /etc/apt/keyrings/docker.gpg


# se agrega el repositorio de docker
RUN echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

# se instala docker y sus componentes
RUN apt-get update \
    && apt-get install -y \
        docker-ce \
        docker-ce-cli \
        containerd.io \
        docker-buildx-plugin \
        docker-compose-plugin

# se instala Node.js 18.x y alguna herramientas npm adicionales
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g pnp@8.15.7 turbo@1.13.3

# se instala kubectl
RUN curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl" \
    && install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

# se agrega al usuario jenkins al grupo docker para que pueda ejecutar docker sin sudo
RUN usermod -aG docker jenkins

# se cambia nuevamente al usuario jenkins
USER jenkins
