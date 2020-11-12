<NavBar></NavBar>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  /*contols label under photo*/
  .picture-label {
    font-family: "Lobster Two", cursive;
    font-size: 6em;
    line-height: normal;
    display: block;
    position: absolute;
    margin-top: 310px;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  /*Controls full container of submission boxes*/
  .container {
    position: absolute;
    top: 74%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  /*contols register button*/
  .signupbtn {
    font-family: "Lobster Two", cursive;
    position: absolute;
    padding: 10px;
    top: 115%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #00FA9A;
    border-radius: 30%;
    font-size: 1.9em;
  }
  /* css for the input fields */
  input[type=text], input[type=password], input[type=email] {
    width: 60%;
    padding: 15px;
    margin-top: 0px;
    margin-bottom: 10px;
    margin-right: 15px;
    margin-left: 150px;
    display: inline-block;
    box-sizing: border-box;
    border: none;
    border-bottom: 2px solid white;
    background: linear-gradient(#36535c, #0d1c16);
    align-content: center;
  }
</style>
<div class=" sign-up">
  <div class="caption">
    <img class="center" height="250px" src="/assets/images/spuds.png" alt="Couch Potato" />

    <h1 class="picture-label">Couch Potato</h1>
  </div>
  <form class="modal-content" action="/action_page.php">
    <div class="container">

      <input type="text" placeholder="First Name" name="first-name" required>
      <input type="text" placeholder="Last Name" name="last-name" required>
      <input type="email" placeholder="Email" name="email" required>
      <input type="password" placeholder="Create a Password" name="psw" required>


      <div class="clearfix">
        <button type="submit" class="signupbtn"><b>Register</b></button>
      </div>
    </div>
  </form>





  {{outlet}}
</div>
