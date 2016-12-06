# Table of Content

+ [Description](#Description)
+ [Getting Started](#GettingStarted)
  * [Prerequisites](#Prerequisites)
  * [Installing](#Installing)
+ [Running the tests](#RunningTheTests)
  * [Break down into end to end tests](#BreakDown)
  * [And coding style tests](#CodeStyle)
+ [Deployment](#Deployment)
+ [Built With](#BuiltWith)
+ [Contributing](#Contributing)
+ [Versioning](#Versioning)
+ [Authors](#Authors)
+ [License](#License)
+ [Acknowledgments](#Acknowledgments)

# <a name="Description"></a>PeerTutor
The idea for this application came about after noticing that many Hunter College students did not benefit from the tutoring services offered at the school.  Furthermore, through a survey we conducted last semester, we found that some students did not like the current tutoring system because of its inflexibility and lack of accessibility.  Also, since most young adults nowadays are accustomed to having everything available at their fingertips, we thought digitalizing the tutoring service system at the college would allow more students to easily seek and receive the help they need with their course materials.  The idea has a lot of resemblance with the Uber business model except that the tutors, in this case, would be funded by the school’s respective departments.

# <a name="GettingStarted"></a>Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
## <a name="Prerequisites"></a>Prerequisites
What things you need to install and how to install them

```
Give examples
```

## <a name="Installing"></a>Installing
A step by step series of steps that will have you install the appropriate enviornment.

1. Open Git Bash and navigate to a place where you want to clone this project
  1. Make folder for The Project
  2. Clone the project
    ```
    git clone https://github.com/Muhand/PeerTutor.git
    ```
  3. Change directory into the PeerTutor
    ```
    cd PeerTutor
    ```
2. Now we need to setup our vagrant machine
    ```
    cd www.peertutor.com
    ```

3. Run the vagrant machine and ssh into it
    ```
    Vagrant up && vagrant ssh
    ```

4. Update the machine
    ```
    sudo apt-get update
    ```

5. Install MySQL Server
    ```
    sudo apt-get install mysql-server -y
    ```
Wait until this screen come up and enter your root password, I will put '123456' without quotes then press 'OK' or hit Enter from keyboard and re-enter the password for confirmation. ![Alt text](https://s16.postimg.org/rqu0ujl39/mysql_0.png "Set Root Password")

6. Lets edit /etc/mysql/my.cnf/ in order to allow connection from any server (DO THIS ONLY FOR DEVELOPMENT PURPOSES, FOR PRODUCTION YOU WILL HAVE TO EDIT EVEN FURTHER).
    I will edit it with nano editor but you can do it with whatever editor you like.
    ```
    sudo nano /etc/mysql/my.cnf
    ```
Then look for 'bind-address' and add '#' before it, now few lines before this look for 'skip-external-locking' and add '#' as well, this will comment these 2 lines which will will allow wildcard connections to the server.
    Your file should look like this at the end
    ![Alt text](https://s17.postimg.org/saq67aehr/mysql_1.png "Wildcard access to the server")

7. Exit out from your editor and save, If you are using nano editor then press the following keys from keyboard one line at the time.
    ```
    CTRL + X
    Y
    Enter
    ```

8. Now we have to create a user for our database, to do this we first have to do the following steps
    1. Login to mysql as root
        ```
        mysql -u root -p
        ```
    2. Type the root password
    3. Now create a user so our app use it, I will call it 'pt_dev' you can call it anything you want but then you will have to change it in the config.json file as well, I will give it '123456' as a password, again if you change it then you must change config.json.
        ```
        CREATE USER 'pt_dev'@'localhost' IDENTIFIED BY '123456';
        ```
    4. We need to give it all of the privileges
        ```
        GRANT ALL PRIVILEGES ON *.* TO 'pt_dev'@'localhost' WITH GRANT OPTION;
        ```
    5. Now we need to create this user to be accessable also from other hosts and not only localhost so we will repeat the above steps and just change 'localhost' to a wildcard '%'
        ```
        CREATE USER 'pt_dev'@'%' IDENTIFIED BY '123456';
        ```
    6. We need to give it all of the privileges
        ```
        GRANT ALL PRIVILEGES ON *.* TO 'pt_dev'@'%' WITH GRANT OPTION;
        ```
    7. Now we need to flush the privileges then simply just exit
        ```
        FLUSH PRIVILEGES;
        exit;
        ```
    8. Now restart MySQL server
        ```
        sudo service mysql restart
        ```
    
9. Now we need to make sure if our database setup was successful or not, for this we need to run MySQL Workbench from our host machine (windows) or any other program that allows us to connect to MySQL server.
    1. Now click on the plus sign, in order to add a new server.
    ![Alt text](https://s12.postimg.org/kwnhr4j99/mysql_2.png "Add new server to MySQL workbench")
    2. Add a connection name, anything you want.
    3. For hostname put '192.168.33.10' (without quotes) or if you have changed it in Vagrantfile then match it.
    4. Port leave it as is 3306
    5. For username put 'pt_dev' (without quotes) or any username you specified in config.json.
    6. Click on 'Store in Vault ...' for password and enter '123456' (without quotes) or any password you specified in config.json.
    7. Press on 'Test Connection', if everything went okay then you should see this
    ![Alt text](https://s11.postimg.org/fbwwqcg5v/mysql_3.png "Successful Connection")
    8. Now Press 'OK' and you should see your new server got added
    ![Alt text](https://s15.postimg.org/worzq9avv/mysql_4.png "New Server Added")
    9. Since we are working with the database then mind as well just add the appropriate database, to do that press on the 'Create a new schema in the connected server' button from the toolbar (THIS HAS TO BE DONE AFTER YOU HAVE CONNECTED TO THE ADDED SERVER)
    ![Alt text](https://s16.postimg.org/8qid9l451/mysql_5.png "Add new database")
    10. Enter a schema name and let it be 'pt_development' without quotes then press 'Apply' and finally press 'Finish'
    11. Now close out MySQL workbench and we are done with setting up our database server and schema.
10. Now back to vagrant we need to install Node.js to do this head to our vagrant/project folder
    ```
    cd /vagrant/project
    ```

11. To install vagrant we need to follow these steps
    1. Install build-essential and other liabraries
        ```
        sudo apt-get install build-essential libssl-dev curl -y
        ```
    2. Curl nvm
        ```
        curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.2/install.sh | bash
        ```
    3. Now we need to load the functions to the shell
        ```
        source ~/.profile
        ```
    4. Check that nvm is available, you should get back 'nvm'
        ```
        command -v nvm
        ```
    5. Install node.js version 6.5.0
        ```
        nvm install 6.5.0
        ```
    6. Verify that node.js is installed correctly
        ```
        nvm ls
        ```
    7. Check the node version and it should say 'v6.5.0'
        ```
        node -v
        ```
    
12. Before installing our dependencies we first need to install sequelize-cli
    ```
    npm install -g sequelize-cli
    ```

13. Now we need to install our dependencies
    ```
    npm install
    ```
        NOTE: if you are running windows that might give you some errors because there is a bug with symlinks so you might want to run the following command
        ```
        npm install --no-bin-links
        ```

14. Now we need to update our database tables, and migrate it with our models
    ```
    sequelize db:migrate
    ```

15. Now run the website
    ```
    npm start
    ```

16. Now test the website is working correctly by going to this address 192.168.33.10:8080 from your web browser and you should see the website running.

---
End with an example of getting some data out of the system or using it for a little demo


# <a name="RunningTheTests"></a>Running the tests

Explain how to run the automated tests for this system

## <a name="BreakDown"></a>Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

## <a name="CodeStyle"></a>And coding style tests

Explain what these tests test and why

```
Give an example
```

# <a name="Deployment"></a>Deployment

Add additional notes about how to deploy this on a live system

# <a name="BuiltWith"></a>Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

# <a name="Contributing"></a>Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

# <a name="Versioning"></a>Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

# <a name="Authors"></a>Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

# <a name="License"></a>License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

# <a name="Acknowledgments"></a>Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc

___

The following is a brief overview of the contents of this repository.


