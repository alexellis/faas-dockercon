## faas-dockercon

FaaS functions for my Dockercon, Austin demos 20th April 2017.

These are the functions I demoed in order. For the video checkout the Docker blog post from 15minutes 40 seconds in.

[Dockercon 2017: Moby's cool hack session](https://blog.docker.com/2017/04/dockercon-2017-mobys-cool-hack-sessions/)

> ## Get started with FaaS here [alexellis/faas](https://github.com/alexellis/faas/)

### Functions

* MyAssistant

Alexa skill for interacting with object storage and payroll engine written in Node.js

> I used a thin abstraction on the top of Minio called [minio-db](https://github.com/alexellis/minio-db) to allow me to store JSON data in a similar way to a document store - think of a much more primitive version of DynamoDB or Mongo.

* Payroll

Payroll engine responsible for adding base salary together with bonus override amount. This was written in Node.js

This was presented by a bonus.json file in Minio and a hard-coded dataset in the payroll function.

* Auto-scaling portion of the demo (mirroring files)

The auto-scaling portion of the demo was triggered when I mirrored an S3 bucket on the west coast over to one on the east coast. The receiving server (Minio) was configured to trigger a webhook into FaaS for every object that it received. The function I used was the `echoit` function which can be found in the [sample stack](https://github.com/alexellis/faas/blob/master/docker-compose.yml) and actually invokes `cat`.

* mobymingle

This function provided integration with E-180's data-stream (the company providing the MobyMingle service) and was a Golang function.

* GetAvatar

Downloads avatar of user in a Github event - taking JSON as input. Written in Python.

* Fanclub	

Received Github event and called into GetAvatar before storing the image as an object in Minio.

> Images were stored in a long-running [Minio](https://minio.io) object storage server in an S3 bucket. Minio is easy to self-host and compatible with the S3 API making it a good choice for my FaaS demo. During the keynote demo I mirrored the S3 bucket containing the avatars over to my desktop so you could see peoples faces appearing as soon as they clicked "Star" on the Github repository.

During the demo so many people visited the Github repsitory to star it that Github issued a denial of service attack warning. The functions even auto-scaled due to the demand which is shown in a graph below.

The fanclub function scaling when hundreds of people all added a Github star to my repository at once:

![Scaling](https://pbs.twimg.com/media/C93MHeqVYAAdRhM.png)
