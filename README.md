<h1>First</h1>   <br />
install mongoDB <br />
<br />
<h1>Command</h1> <br />
            npm run dev         -----------     run app <br />
            npm run seed        -----------     seed data <br />
<br />
<h1>Envirionment</h1>     <br />
            Postman <br />
<br />
            setup environtment <br />
            <img src="https://user-images.githubusercontent.com/66521122/192918169-afae592e-69ae-4d0f-8e3b-64eef1d8af02.png"> 
            <br />
            
<b><i>import collection</i></b>
import "<b>bookApp.postman_collection.json</b>" to postman. <br/>

Add this command to "<b>Tests</b>" Tag in "<b>Auth/Sign-in</b>" API
"<b>pm.environment.set("TOKEN", pm.response.json().token);</b>"

<img src="https://user-images.githubusercontent.com/66521122/192919017-c4503993-28af-4fbb-a468-abd8a915e6cb.png">



<b><i>setup authorization</i></b> <br/>

set "<b>authorization</b>" to "<b>Beaer TOKEN</b>" <br/>
set "<b>token</b>" to "<b>TOKEN</b>" <br/>
<img src="https://user-images.githubusercontent.com/66521122/192918630-96f7952c-65e5-4505-b0b1-f2d643606a92.png">

