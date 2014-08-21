*I will be building a minimalistic Log application using the ExpressJs framework for NodeJs.
I had started off by building it with HapiJs, developed by Walmart Labs, but decided to change framework in the initial stages of development
due to the lack of examples available that use HapiJs.*

*With this app you will be able to take note of your progress,
by creating logs of your daily performance in whichever area you wish.*

*This app will start-off small and simple, allowing you to create new logs,
delete logs, view and update existing logs.*

**So please take into consideration that this is a work-in-progress!**

---

##To Do :

- [x] Design Layout
- [x] Implement RDD (Readme Driven Developement)
- [x] Begin coding with tests (This is always best practice)
- [ ] Define function do add person to database
- [ ] Define function to add workouts per user to database
- [ ] Define function to retrieve user's workouts by exercise and returns date, muscle group and sets
- [ ] Validation
- [ ] Authentication
- [x] Choose Database
- [x] Implement Database
- [ ] Implement Jade Views
- [ ] UI
- [ ] Test everything works
- [ ] Deploy App


---

##Why Hapi?

####For the following reasons:
* It is one of the most popular frameworks available for NodeJs.
* There is extensive support and many available examples for using Express.
* It's lightweight and minimalistic

---

##Which Database?


- [ ] Apache CouchDb - http://couchdb.apache.org/
- [x] CouchBase - http://www.couchbase.com/wiki/display/couchbase/Home
- [ ] MongoDb - http://www.mongodb.org/

Performance wise, there is no major issue with any of these databases. This is not intended to be a big app with thousands of users.

---

###CouchDb

So bearing that in mind I started with *CouchDb*, but found I had trouble with connecting to the dabase while using tha HapiJs framework. Like I said there aren't that many examples to follow.
The documentation also seems to be presented in a not too friendly fashion. You might find it to be fine, but not for me.
I also found that I had trouble using or finding frameworks available to connect to CouchDb.

* See *ChouchDb* Vs *CouchBase* (http://www.couchbase.com/couchbase-vs-couchdb)

####I dumped *ChouchDb* and tried *CouchBase*.

---

###CouchBase

My first warning, is that after you install *CouchBase* from the website(http://www.couchbase.com/), you should always install the 'Developer Preview' as show in this tutorial (https://github.com/nelsonic/time):

```
npm install couchbase@2.0.0-dp1 --save
```
>When you proceed with the setup in the Admin Web Console, I would suggest that you avoid setting your username as **Admin**. I ran in to an issue before where I could not sign-in to my Web Console after loggin out and had set username to Admin. I had to completely remove CouchBase form my Mac and re-install it and then set my username to something other than **Admin** and it is now working fine! I do not know if it there was some sort of conflict with a probable default username **Admin** or **Administrator**.

The documentation for *CouchBase* is easy to follow and there are many examples.

I decided to use CouchBase.

For additional information on setting-up *ChouchBase* on a Mac, go to https://github.com/couchbaselabs/docs-ng/blob/master/content/couchbase-manual-2.0/installing-and-upgrading.markdown#mac-os-x-installation

For a **quickstart** guide and a detailed example of how to use couchbase views in your app:
http://docs.couchbase.com/couchbase-sdk-node-1.2/#quickstart
and
https://github.com/couchbaselabs/beersample-node

Also see: http://docs.couchbase.com/couchbase-devguide-2.5/#introduction-to-couchbase

For understanding views : http://docs.couchbase.com/couchbase-devguide-2.5/#finding-data-with-views

Another simple tutorial using Node.js and Couchbase: http://tugdualgrall.blogspot.co.uk/2013/03/easy-application-development-with.html

For the Node.js Api, list of methods: http://www.couchbase.com/autodocs/couchbase-node-client-1.0.0-beta/Connection.html

For a tutorial using CouchBase, Node and Angular - https://www.youtube.com/watch?v=Ynr8E5Rf1aA

---

###MongoDb

The documentation for *MongoDb* is very clear and well organised.
There are lots of examples to follow.

http://www.mongodb.org/

http://mongoosejs.com/docs/index.html

I seem to have found an alternative with the *mongoose-simpledb* module.

See this video to "learn" how to connect to *MongoDb*:
* https://www.youtube.com/watch?v=CIPbmPUKyMI

The module used in this video (*mongoose-simpledb*) can be found at: https://www.npmjs.org/package/mongoose-simpledb


---



Using CouchBase
---

Couchbase has a good tutorial on how to connect with the database using the Node SDK.
http://docs.couchbase.com/couchbase-sdk-node-1.2/#quickstart


### Notes on development

>From what I gathered Couchbase does not auto-generate document ID's, for which
>it is left up to the developer to create the ID. This can be tricky. In this case
>I was considering using the personId and the date to form a unique Doc. ID, but there is also the case
>that the user might decide to workout twice a day, in which case it would be necessary to
>have the option of updating an existing document and maintaining its current ID without overriding
>already existing data.

>Another issue I have run into is in the structure of each workout document.
>It is necessary to have the document allow for the insertion of as many exercises as necessary per workout
>without generating another document. How to have the application auto-generate new
>exercise lines is another issue to look into.

>I am currently having trouble with the done_create_workout function. I need to pass the values
>of the body been sent to the database as to create the unique doc ID and also to have the doc posted to the database.  
