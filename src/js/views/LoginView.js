class LoginView {
	_LoggedIn;
	_email = document.getElementById("email");
	_password = document.getElementById("password");
	_LoginBtn = document.getElementById("login-btn");
	_loginPage = document.querySelector(".login__container");
	_loginErrorMessage = document.getElementById("errorMessage");
	_homePage = document.querySelector(".homepage__container");

	constructor() {
		this._LoggedIn = false;
	}

	/**
	 * enables a user to login using account details provided in the account object
	 * then transfers the user to the home page if password & email input are correct
	 * by seting the opacity of the login page to zero
	 * and print an error message if condition is false.
	 */
	_userLogin = function () {
		const account = {
			email: "account@gmail.com",
			password: 1234,
		};

		if (
			account.email === this._email.value &&
			account.password === +this._password.value
		) {
			this._loginPage.style.opacity = 0;
			this._homePage.style.opacity = 100;
			this._LoggedIn = true;
		} else {
			this._loginErrorMessage.innerText =
				"Invalid email/password, Please enter correct information to continue!";
			this._LoggedIn = false;
		}
	};

	loginBtnListener() {
		// listens for click event from the login button
		// then calls the userLogin() function.
		this._LoginBtn.addEventListener("click", (e) => {
			e.preventDefault();
			this._userLogin();
		});
	}

	render() {
		this.loginBtnListener();
	}
}

export default new LoginView();
