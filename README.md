## faas-dockercon

FaaS functions for my Dockercon, Austin demos 20th April 2017.

These are the functions I demoed in order. For the video checkout the Docker blog post from 15minutes 40 seconds in.

[Dockercon 2017: Moby's cool hack session](https://blog.docker.com/2017/04/dockercon-2017-mobys-cool-hack-sessions/)

### Functions

* Fanclub	

Received Github event and called into GetAvatar before storing the image in Minio

* GetAvatar

Downloads avatar of user in a Github event

* mobymingle

Integration with the E-180 data-stream behind the MobyMingle (Golang)

* MyAssistant

Alexa skill for interacting with object storage and payroll engine

* Payroll

Payroll engine responsible for adding base salary together with bonus override amount


The fanclub function scaling when hundreds of people all added a Github star to my repository at once:

![Scaling](https://pbs.twimg.com/media/C93MHeqVYAAdRhM.png)
