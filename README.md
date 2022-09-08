

# What's Happening 🧠

(9/8/22):
I cannot believe its been since April that I've worked on this. Well, I'm back... and adding websockets. And that's not it, i'm converting the backend from NodeJS to Java Spring so that I understand it better for work. Spring should actually prove to be better suited anyway, since I want the reliability and security it promises. Let's hope it backs up those claims. Also going to implementing OAuth2 using the Spring backend, but not just yet.

Also need to deploy this backend somewhere other than heroku, as it is too expensive. Looking into a couple options, but will likely learn Docker in the process. Thinking of fly.io or GCP for the cloud providers. Also going to be using Cassandra for the DB, so need to figure out where to host that as well. I'm a noob with the infra stuff so I should learn a lot here.

(4/5/22):
Fixed all dependency errors by using yarn instead of npm, and rebuilt the dependency tree. This change was recommended by React which someone on the React team probably encountered this issue and added a debug log for it.

(3/31/22):
It appears that zlib is a package that is messing with other packages, and is all included under webpack.
To fix this, I'm going to have the backend code outside of the scope of React's package.json
Which means creating a folder called React and placing all of the react files in that folder.
And then creating a folder called Backend and placing all of the backend files in that folder.

It is annoying but seems to be the best way to prevent any cross-compatibility problems, even though packages like zlib should never cause this issue in the first place.

(3/30/22):

Was working off of the redis branch to originally implement redis
That was too hard as I don't understand how RedisJSON works, and normal redis is key value pairs
And i need to store 3 values at least, so I decided to go with MongoDB.
I will test if caching positons is required to ensure satisfactory speed,
however I think that implementing websockets first would be more beneficial,
as i expect more latency to come from the http requests than the database actually getting the information
I could be wrong, so when the time comes, Ill run some tests

Until then, Im going to merge the redis branch to the master branch, and open a new branch for integrating the http methods nicely with the components,
and hopefully get most of the frontend done. This is going to be very interesting.
