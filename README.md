# nifty-recognizer

node server and html files to connect the DeckedBuilder card recognizer to a streaming overlay. Also includes a special build of the DeckedBuilder software and the orb_maker.exe program to generate custom card databases.

Requires Node.js (with express and socket.io).

> **Big thanks to the awesome folks at DeckedBuilder for not only making a great program but for generously allowing me to distribute the orb_maker utility and modified DeckedBuilder program to support the Magic: The Gathering streaming community. Please give appropriate credit on your stream if you use this software.**

## Installation

First, install Node.js from https://nodejs.org/en/download/. Clone this repository into a directory, and then open a command prompt in that directory. Install the dependencies:

```
npm install
```

Start the server as follows:

```
node index.js
```

### DeckedBuilder Installation

The version of DeckedBuilder available from the deckedbuilder.com no longer supports the interface between the recognizer and the overlay. Thankfully the developers of DeckedBuilder have made a special build of the program and have given me permission to distribute it.

In the `extras` folder unzip the `decked-wpf-v146.zip` file, giving you a `decked-wpf` folder. Launch `DeckedWpf.exe` for the new DeckedBuilder program. It should operate exactly the same as the normal DeckedBuilder software, but it can load custom orb files and sends the required notifications to the overlay.

_Note: This version of DeckedBuilder should be able to receive card database updates as normal, but **do not install any program updates** as that could break the overlay functionality again._

To connect DeckedBuilder to the overlay, you must also add the following line:  
`<v key="OrbCam_match_url" value="http://localhost/cardmatch/{0}" />`  
just above the `</config>` tag in the DeckedBuilder configuration file, located at:
`C:\Users\<username>\AppData\Local\deckedbuilder\deckedbuilder.xml`

## Usage

Once the server is running and DeckedBuilder v1.46 is installed, you can insert `http://localhost/card-view.html` into your streaming program as an html page. It will initially load as an MtG card back and then display cards as they are recognized by DeckedBuilder.

For greater control, you can also open `http://localhost/card-controller.html` in your web browser. This page also connects to the `card-view.html` overlay and allows you to drag and drop arbitrary card images from your computer or from a website (ie. from Gatherer or scryfall.com) and will also allow you to clear the current card image.

## Custom Orb files

The method that DeckedBuilder uses for card recognition is quite resource intensive and increases with the number of cards in the set it is looking at so it is not practical for it to search all >30,000 possible cards at once. DeckedBuilder gets around this by limiting the search database to only certain sets, called orb files. DeckedBuilder comes with orb files for all the MtG sets all the way back to Alpha, but it can only have a maximum of 4 loaded at any one time. You will see these sets down the left hand side of the cardcam2 page. Loading only a few sets works fine when the recognizer is being used for draft or sealed or even for many standard environments, but for other formats like Legacy, Commander or Highlander we often need to recognize cards from many different sets at once. This is where the `orb_maker_v3.zip` comes in. This program allows you to build a _custom_ orb file based on any set of cards in a folder.

### Making Custom orb Files

unzip the `orb_maker_v3.zip` file in `extras`. orb_maker.exe is a windows command line program that creates a new orb file for DeckedBuilder based on an arbitrary set of images. To make a custom orb file using all the jpg images in the current directory, use this command:

```
orb_maker.exe <orb name>.orb *.jpg
```

From various experiments, I can tell you that DeckedBuilder seems to work best with input image that are around 220px-250px across. The card images in Gatherer are 223x310 so they work fine. I don't know what the upper limit of cards that DeckedBuilder can have loaded into its search database, but I try to keep it below 600 images for snappy performance. Sometimes this means having separate orb files for each deck and switching between games.

### Using Custom orb Files

To use your custom orb file, go to the cardcam2 (beta) screen in DeckedBuilder as you would if you were recognizing an existing set, but instead of checking the boxes on the left, hit **CTRL-O** which will open up the custom orb open dialog box. choose your orb file and it should load. You can load multiple orb files at the same time (for different decks, etc), Hit **CTRL-U** to unload all custom orbs.

The built-in DeckedBuilder sets send the card's multiverse id to the overlay, which it then attempts to load from Gatherer. When you are using a custom orb file, the overlay instead receives the filename of the image that was processed with orb_maker. The way I have setup the nifty-recognizer server is that it looks for those images in the `public/cards` folder.
eg. if the image processed by orb_maker is `lightning-bolt.jpg`, the overlay will be trying to load `http://localhost/cards/lightning-bolt.jpg`

## Tutorial Video

_Note: this is somewhat out of date now, but it still explains the basics of setting up the nifty-recognizer system_

<a href="http://www.youtube.com/watch?feature=player_embedded&v=euNHK_GJbvI" target="_blank"><img src="http://img.youtube.com/vi/euNHK_GJbvI/0.jpg" alt="LRRTechtorial - Card Recognizer" width="400" height="240" border="10" /></a>

LRRTechtorial - Card Recognizer
