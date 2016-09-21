# nifty-recognizer
node server and html files to connect the Deckedbuilder card recognizer to a streaming overlay

Requires [Deckedbuilder](http://www.deckedbuilder.com/) for Mac or Windows and Node.js (with express and socket.io)

---

To connect deckedbuilder to the overlay, you must add the following line:  
`<v key="OrbCam_match_url" value="http://localhost/cardmatch/{0}" />`  
just above the `</config>` tag in the Deckedbuilder configuration file, located at:

**Windows** - `C:\Users\<username>\AppData\Local\deckedbuilder\deckedbuilder.xml`
