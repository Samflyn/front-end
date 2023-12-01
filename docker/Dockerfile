# after installation add usser to docker group, so that there's no need to use root for every command
# sudo usermod -aG docker sam

# install docker, docker-machine & docker-compose

# if there's an error connecting to socket either add the user to group or run as sudo

# to show configs
# docker info

# new syntax
# docker <command> <sub-command>
# docker container run

# old syntax
# docker <command>
# docker run



# CONTAINERS

# to run a new container
# docker container run --publish 80:80 nginx

# the publish command exposes the host port 80 to port 80 of the container

# to run it in background
# docker container run --publish 80:80 --detach nginx

# to get the list of all running container
# docker container ls

# to get all the containers
# all containers by default will get an unique id and name
# docker container ls -a

# to set a name to container
# docker container run --publish 80:80 --detach --name <name> nginx

# to get the logs of the container running in background
# docker container logs <name>

# to check process running in container
# docker container top <name>

# to remove a container
# docker container rm <id> <id>

# docker container run
# it checks for the image in cache
# then it looks at hub.docker.com and downloads it
# creates a new container based on that image
# gives it a virtual ip inside docker engine
# opens host port and forwards to container port

# container is just processes running in host
# in windows and mac it will run on vm

# details of conatiner
# docker container inspect <id> or <name>

# performance stats for all container
# docker conainter stats

# to set environmental value to a container
# docker container run nginx <variable>=<value>

# to get a shell inside container
# docker container run -it nginx
# i -> keep the session open
# t -> tty

# docker container run -it <image-name> <command>

# by default docker will give a default command based on the image

# docker container run -it --name alpine alpine bash

# we can only run commands included in the image

# every time docker container run is used, it will spin up a new container based on that image
# the changes made in the previous container will not be copied

# to use the old container
# docker container start -ai <id> or <name>
# a -> attach STDIN/STDOUT

# to run a shell inside the container that is already running in background
# to run additional processes
# docker container exec -it <id> or <name> bash



# NETWORK BASICS

# each container will connect to private network "bridged"/"docker0"
# each virtual network will route through NAT firewall on host ip - to allow internet access or local
# all containers can access each other without -p on the same network

# we can use the host network but will loose container benefits --net=host

# to get the ports used by the container
# docker container port <id> or <name>

# to get the ip of the container
# the ip of host and container are not the same
# docker container inscect --format "{{ .NetworkSettings.IPAddress }}"

# to show all networks
# docker network ls

# to inspect a network
# docker network inspect <name>

# to create a network
# docker network create <name> --driver(optional) --driver defaults to bridge

# to attach/detach network to container
# docker network connect/disconnect <network> <name>



# DNS

# since ip's are dynamic and the ip of the container will change if docker restarts it upon an error
# the best way is to use DNS

# docker uses container names as the host name
# the networks created will get automatic dns resolution for all containers in the network
# the containers can use the name and access others without ip address

# we can also have multiple dns for the same container
# or have multiple containers for same dns
# docker container run --net-alias <name> <image>

# if we use the dns for multiple containers, docker will use round robin for dns



# IMAGES

# docker uses unified file system
# images have layers for each change and differs using sha
# images can be built upon other images
# if images are based on same layers then only one copy is stored instead of multiple copies

# to check history of the image
# docker history <name>

# to check the metadata of an image
# docker image inspect <name>

# TAGGING

# docker images can be tagged with more than one tag
# default tag is latest

# to tag an image
# docker image tag <image> <image:tag>



# DOCKERFILE

# always use the things that change the least at the top
# dockerfile has steps chached and when it is re-run if the lines are not changed cache is used
# to build the image from dockerfile
# -t -> to tag and . -> to use the dockerfile in the current directory
# docker image build -t <repository:tag> .

# FROM node:alpine

# EXPOSE 3000

# RUN apk add --update tini

# RUN mkdir -p /usr/src/app

# WORKDIR /usr/src/app

# COPY package.json package.json

# RUN npm install && npm cache clean --force

# COPY . .

# CMD [ "tini", "--","node", "./bin/www" ]



# PERSISTANT DATA - VOLUMES

# containers are immutable
# to make use of persistant data docker has volumes and bind mounts
# volumes - make location outside of container UFS
# bind mounts - mount host path to container
# https://12factor.net/
# https://medium.com/@kelseyhightower/12-fractured-apps-1080c73d481c#.cjvkgw4b3

# volumes are independent of container
# to create named volumes

# docker volumes use random sha
# to use named volumes
# docker container run -d --name mysql -e MYSQL_ALLOW_EMPTY_PASSWORD=True -v <name>:<location> mysql

# to list docker volumes
# docker volume ls

# for few cases we can create docker volumes before running container
# docker volume create

# bind mounts
# map host file directory to container directory
# using volumes and bind mounts skips UFS
# host files overwrite any files in container, but when no files are mounted the container uses the in image files
# bind mounts cannot be specified in Dockerfile, need to be specified at runtime
# container run -v /sam/home/dir:/path/container
# container run -v //c/sam/home/dir:/path/container - Windows
# $(pwd) linux, ${pwd} Windows

# for services instead of using -v use --mount type=volume, source=data, target=/var/lib/postgresql/data



# DOCKER COMPOSE

# we can configure multiple containers and relations between them
# create one line env startups
# we can use YAML or docker-compose
# defaults to docker-compose.yml or use -f to specify the file to use

# docker-compose-cli is ideal for development and testing
# docker-compose up for setting up volumes/network and start all containers
# docker-compose down for stopping and removing the container/volumes/networks

# for building compose
# FROM drupal

# RUN apt-get update && apt-get install -y git \
#     && apt-get clean

# WORKDIR /var/www/html/themes

# RUN git clone https://git.drupal.org/project/bootstrap.git \
#     && chown -R www-data:www-data bootstrap

# WORKDIR /var/www/html



# DOCKER SWARM
# docker swarm is not enabled by default
# manager nodes have database called raft database which contains TLS and authority certificates
# manager nodes and worker nodes are interchangable
# Raft consensus group -> DB and managers
# Gossip network -> workers

# with swarm can be used to create no of replicas which are called tasks
# a service can run the defined tasks as nodes and spread them
# each node will be placed in seperate container

# http://thesecretlivesofdata.com/raft/
# https://www.youtube.com/watch?v=dooPhkXT9yI&list=PLkA60AVN3hh-jd4zGpRWHG8LIQUpBXBsM
# https://speakerdeck.com/aluzzardi/heart-of-the-swarmkit-topology-management

# to enable swarm in docker
# docker swarm init
# docker will create a root signing cert
# will create a special cert for the manager node
# creates join token

# raft database is created to store root cert, configs and secrets
# encrypted by dedfault

# to get the list of all nodes available
# docker node ls
# there can only be one leader at a time

# to manage services in swarm
# docker service COMMAND like docker run
# docker service create alpine ping 8.8.8.8

# to get list of all services
# docker service ls

# to change service configs
# docker service update <name/id> --replicas 3

# to remove a service
# docker service rm <name/id>



# SWARM WITH MULTIPLE NODES

# docker-machine can be used to create nodes
# docker-machine create node1

# to ssh into the node
# docker-machine ssh node1

# to get the node details
# docker-machine env node1

# to work with multiple nodes
# we can join the node to the manager node
# we can joint the node as a manager or a worker
# to make a worker a manager
# docker node update --role manager node2

# workers cannot use swarm commands
# to join node as a manager
# we need to get the join-token manager
# docker swarm join-token manager

# to get the services running on the node
# docker node ps <name>

# https://www.bretfisher.com/docker-swarm-firewall-ports/



# OVERLAY NETWORK

# swarm introduces a new network called overlay
# used for intra swarm communication
# each service can be connected to multiple networks
# this can be used as a virtual network accross multiple nodes



# ROUTING MESH

# it can be used as load balancing
# if a service is running on node2, it can be accessed from any of the nodes available
# the nodes internally will redirect to the container running on any of the node
# all nodes will listen on the port for the container and re-route to that container
# even if a container is stopped and spun up on other node it will still be access from any node
# uses IPVS from linux kernel
# is a stateless load-balancing
# load-balancing is at layer-3(TCP) not layer-4(DNS)



# SWARM STACKS

# compose files for production swarm
# stacks accept compose files as declarative definition for containers, services, networks, volumes and secrets
# docker stack deploy
# can't build in compose but only to deploy
# compose ignores deploy and swarm ignores build
# stack includes volumes and overlay networks
# docker stack deploy -c docker-compose.yml <name>
# stack will schedule the tasks and start them up

# docker stack services <name>

# to update the services
# docker stack deploy -c docker-compose.yml <name>
# it will check the existing services and update them based on the compse file

# https://github.com/BretFisher/ama/issues/8



# SECRETS STORAGE

# to store secrets in swarm
# swarm raft is encrypted
# secrets are stored only on manager nodes
# keys get down through TLS control plane with mutual authentication
# secrets are stored in swarm and assigned to a service
# only assigned services can use the keys
# will be visible as a file in container at /run/secrets/<name>

# two ways to create a secret
# - use a file
# - pass value at command line

# docker secret create psql_user psql_user.txt
# echo "password" | docker secret create psql_password -

# to assign a secret to a service
# docker service create --name psql --secret psql_user --secret psql_password \ 
# -e POSTGRES_PASSWORD_FILE=/run/secrets/psql_password \
# -e POSTGRES_USER_FILE=/run/secrets/psql_user

# if secrets are added or removed the container will re restarted



# SECRETS IN LOCAL COMPOSE

# at runtime it bind mounts the file in the container
# not secure but can be used locally for testing and dev


# docker-compose.override.yml
# if there is a file named with above name docker will automatically pick up the file and use it
# it will be used along with the base docke-compose.yml

# docker-compose -f a.yml -f b.yml config
# this will combine all the yml and push it into one docker-compose



# SERVICE UPDATES
# updates are rolling update pattern for replicas
# stack deploy for existing service will issue an update

# docker service update --image <name> <servicename>
# docker service scale <name>=5

# swarm updates in stack files
# docker stack deploy -c file.yml <stackname>

# when nodes are added, services will not automatically be added to the new nodes
# forcing docker service to update will first use the nodes that are running least services and even them out
# docker service update --force <name>



# HEALTHCHECKS
# commands are running inside the container
# expects 0 or 1 for exit code
# states -> starting, healthy, unhealthy
# starting is for the first 30 seconds by default
# healthy is if the first exit code is 0
# by default it will run it every 30 seconds
# HEALTHCHECK curl -f http://localhost/ || flase
# HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD [ "executable" ]

