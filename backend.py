import time
import numpy as np
import firebase_admin
from firebase_admin import credentials, db
import pyrebase
config = {
  "apiKey": "apiKey",
  "authDomain": "noreply@zinc-e9f9c.firebaseapp.com",
  "databaseURL": "https://zinc-e9f9c.firebaseio.com",
  "storageBucket": "gs://zinc-e9f9c.appspot.com"
}
firebase = pyrebase.initialize_app(config)

cred = credentials.Certificate('zinc-e9f9c-firebase-adminsdk-6li94-1154212155.json')
firebase_admin.initialize_app(cred, {
    'databaseURL' : 'https://zinc-e9f9c.firebaseio.com/'
})
categories = ['Snow_Shoveling', 'Moving', 'Gardening', 'Lawn_Mowing', 'Plumbing', 'Leaf_Raking', 'Painting', 'Flooring', 'Electricity', 'Cooking', 'Cleaning']
users = {}

class User:
    def __init__(self, username):
        self.username = username
        self.personE = 0.5
        self.personW = 0.5
        self.numE = 1
        self.numW = 1
        self.databaseW = {}
        self.databaseE = {}
        #pe, pw, e, s, r
        for i in range(len(categories)):
            self.databaseW[categories[i]] = [np.array([0.5, 0.5, 0.5, 0.1, 0.1])]
            self.databaseE[categories[i]] = [np.array([0.5, 0.5, 0.5, 0.1, 0.1])]
    def knn(self, person, search):
        sum = 0
        cnt = 0
        dis = 0.75
        for arr in search:
            temp = arr[:4]-person
            mag = np.sqrt(temp.dot(temp))
            if mag<dis:
                sum+=arr[4]
                cnt+=1
        return sum/cnt
    def recommendJob(self, jobs):
        res = []
        for j in jobs:
            E = users[j[0]]
            sz = len(self.databaseW[j[2]])
            a, b, e, s, r = self.databaseW[j[2]][sz-1]
            val = self.knn( (E.personE, self.personW, e, s) , self.databaseE[j[2]])
            res.append((val, j[0]))
        res.sort()
        return [x[1] for x in res]
    def recommendWorker(self, jobs):
        res = []
        for j in jobs:
            W = users[j[1]]
            sz = len(self.databaseE[j[2]])
            a, b, e, s, r = self.databaseE[j[2]][sz-1]
            val = self.knn( (self.personE, W.personW, e, s) , self.databaseW[j[2]])
            res.append((val, j[1]))
        res.sort()
        return [x[1] for x in res]

def surveyWorker(username):
    #get data
    ws = db.reference('Users/'+username+'/WSurvey').get()
    job = db.reference('Users/'+username+'/WSurvey/Job').get()
    E = users[job['Employer']]
    category = job['Category']
    es = db.reference('Users/'+E.username+'/ESurvey').get()
    W = users[username]
    #update personalities
    E.personE = (E.personE*E.numE+ws['Personality'])/(E.numE+1)
    E.numE+=1
    W.personW = (W.personW*W.numW+es['Personality'])/(W.numW+1)
    W.numW+=1
    #update category map
    enjoyment = ws['Enjoyment']
    skill = es['Skill']
    recommendW = ws['Recommend']
    recommendE = es['Recommend']
    if category not in W.databaseW:
        W.databaseW[category] = [np.array([E.personE, W.personW, enjoyment, skill, recommendW])]
        E.databaseE[category] = [np.array([E.personE, W.personW, enjoyment, skill, recommendE])]
    else:
        sz = len(W.databaseW[category])
        a, b, c, d, e = W.databaseW[category][sz-1]
        W.databaseW[category].append(np.array([E.personE, W.personW, (c+enjoyment*sz)/(sz+1), (d+skill*sz)/(sz+1), (recommendW+e*sz)/(sz+1)]))
        a, b, c, d, e = E.databaseE[category][sz-1]
        E.databaseE[category].append(np.array([E.personE, W.personW, (c+enjoyment*sz)/(sz+1), (d+skill*sz)/(sz+1), (recommendE+e*sz)/(sz+1)]))

users['gtangg12'] = User('gtangg12')
users['alex105'] = User('alex105')
users['jjj7'] = User('jjj7')
surveyWorker('gtangg12')
surveyWorker('alex105')
job = ('gtangg12', 'alex105', 'Gardening')
job2 = ('gtangg12', 'jjj7', 'Gardening')
job3 = ('gtangg12', 'alex105', 'Snow_Shoveling')
print(users['gtangg12'].recommendWorker([job, job2]))
print(users['alex105'].recommendJob([job, job2, job3]))
