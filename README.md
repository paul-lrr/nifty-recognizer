# nifty-recognizer
node server and html files to connect the Deckedbuilder card recognizer to a streaming overlay

Requires [Deckedbuilder](http://www.deckedbuilder.com/) for Mac or Windows and Node.js (with express and socket.io)

### Installation
First, install Node.js from https://nodejs.org/en/download/. Clone this repository into a directory, and then open a command prompt in that directory. Install the dependencies:

```
npm install
```

Start the server as follows:

```
node index.js
```

Once the server is running, visit http://localhost/card-view.html and http://localhost/card-controller.html in your web browser.

To connect deckedbuilder to the overlay, you must add the following line:  
`<v key="OrbCam_match_url" value="http://localhost/cardmatch/{0}" />`  
just above the `</config>` tag in the Deckedbuilder configuration file, located at:

**Windows** - `C:\Users\<username>\AppData\Local\deckedbuilder\deckedbuilder.xml`

### Tutorial Video

<a href="http://www.youtube.com/watch?feature=player_embedded&v=euNHK_GJbvI" target="_blank"><img src="http://img.youtube.com/vi/euNHK_GJbvI/0.jpg" alt="LRRTechtorial - Card Recognizer" width="400" height="240" border="10" /></a>

LRRTechtorial - Card Recognizer
