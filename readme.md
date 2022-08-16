
# JobFinder - Online Job Recommender (Client)

JobFinder is a web app which allows Employers to post jobs and Job seekers to search and apply to those jobs.

## Run Locally without Docker

Make sure you have ffmpeg, rabbitMQ and mongoDB installed locally before following the below steps.

Clone the project

```bash
  git clone https://github.com/binoy638/job-recommender-client
```

Go to the project directory

```bash
  cd job-recommender-client
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env.local file

`NEXT_PUBLIC_BASE_URL`

## Related

Here is the server [repo](https://github.com/binoy638/job-recommender-api).

## Screenshots

![home](/screenshots/home.png)

![jobs](/screenshots/jobs.png)

![signup](/screenshots/signup.png)

![signup2](/screenshots/signup2.png)

![signup3](/screenshots/signup3.png)

![applications](/screenshots/job-applications.png)

## License

[MIT](https://choosealicense.com/licenses/mit/)
