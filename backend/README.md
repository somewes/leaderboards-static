# SRL Leaderboards

This is a Django project with a single `leaderboards` app. Essentially everything related to the leaderboards should be kept within the `leaderboards` subdirectory. This will be added into rainbowism's main SRL repository before launch.

## Development Requirements

* Python 2.x
* Git

## Setup

### Installing Git

#### Windows
One of the easiest ways to set up git to work with GitHub repositories on windows is through [GitHub for Windows](http://windows.github.com/). Installing this program will also install git. (*NOTE*: The latest version of the GitHub for Windows program has a bug that can prevent you from logging into your account. To fix this, install the [.NET Framework 4.5](http://www.microsoft.com/en-in/download/details.aspx?id=30653) on Windows Vista or higher, or download [this patch for the .NET Framework 4](http://www.microsoft.com/en-us/download/confirmation.aspx?id=3556) on Windows XP and install it after installing GitHub for Windows.)

If you prefer (and know what you're doing), you can install git alone through a package like [msysGit](http://msysgit.github.io/). You can also install and run git through Cygwin.

#### Debian/Ubuntu
This is as simple as `sudo apt-get install git-core`. If you would rather install from source, go ahead.

#### OS X
Installing either Xcode or the Xcode Command Line Tools should install git as well. You can download those [here](https://developer.apple.com/downloads/index.action) or through the App Store. You can also install git through homebrew with `brew install git`, or download git directly from [git-scm.com](http://git-scm.com/download/mac). (You could also use [GitHub for Mac](http://mac.github.com/))

### Cloning the repository

#### Through the GitHub App
Run the GitHub app and login with your GitHub account credentials. Once you connect to your GitHub account and configure your name and email address, click the "Clone in Desktop" button on this page. (It should be in the right sidebar above the "Download ZIP" button.)

#### Through the command line
If you haven't set up your SSH keys with GitHub before, [you'll need to do that first](https://help.github.com/articles/generating-ssh-keys). Make sure `git` is on your path, navigate to wherever you want to keep the code on your local machine, and run
`git clone git@github.com:jaredbranum/srllb.git`.

### Installing Python and Pip

#### Windows
Download a Windows MSI installer for Python 2 from [python.org](http://www.python.org). At the time of this writing, the latest Python 2 release is 2.7.6, [which you can download here](http://www.python.org/download/releases/2.7.6/). Run the x86 or x86-64 installer (depending on your architecture), and go through the install wizard.

Next, you'll want to add Python to your environment path. If you don't already have [Powershell](http://support.microsoft.com/kb/968929), you should install that. It should be included on Windows 7 and 8, but for older versions of Windows you'll probably need to download it. To add Python to your environment Path, run this command in Powershell:

    [Environment]::SetEnvironmentVariable("Path", "$env:Path;C:\Python27\;C:\Python27\Scripts\", "User")

Now you'll need to install Pip. First, download the [ez_setup.py](https://bitbucket.org/pypa/setuptools/raw/bootstrap/ez_setup.py) script. Close PowerShell and reopen it, then navigate to the directory where you saved the ez_setup.py file. Run `python ez_setup.py`. This installs setuptools, which you need for Pip. Once this is done, download [get-pip.py](https://raw.github.com/pypa/pip/master/contrib/get-pip.py) and run it in PowerShell the same way (`python get-pip.py`). This will install Pip.

#### Debian/Ubuntu
You should already have Python. Make sure you're using Python 2.x (`python --version`), and install pip if you need to with `sudo easy_install pip`.

#### OS X
Python is already installed on every modern OS X release, so there's no need to install that. If you haven't already, install pip with `sudo easy_install pip`.

### Installing the required packages

Navigate to the project directory in your shell (or if you're using the GitHub app, click "open a shell here" under the tools menu in the srllb repository). Run `pip install -r requirements.txt`. On some Linux or Mac systems, you may need to run `sudo pip install -r requirements.txt` instead and type in your password.

### Start the webapp

From the project directory, run `python manage.py runserver`. Visit [http://localhost:8000/leaderboards](http://localhost:8000/leaderboards) to see it.

