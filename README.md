Hello!

This is a repository for the Module 15 Leaflet Challenge through the UofM Data Analytics Bootcamp course. 
The dataset is focused on earthquake readings pulled from the United States Geological Survey. We were asked to create visualizations of earthquake readings using leaflet.
There were 2 primary tasks, create the visualizations and (optionally) add more data and controls. This repository has both tasks completed.
More specifically, the first visualization needed to have:
  - A map that plots all the earthquakes from the dataset using their recorded coordinates
  - A marker for each earthquake on the map that reflected the magnitude by their size and the depth of the earthquake by their color
  - Popups for each earthquake on the map that provides specific information for it (in this case I show the location, the magnitude, and the coordinates)
  - A legend that provides context for the earthquake depth color scale

For part 2, the visualization had to have:
  - Using an additional provided dataset, plot out tectonic plate fault lines (I added popups to the lines that shows the abbreviated plate name from the data)
  - Additional base maps to choose from (I added a full color topographical map and a street map)
  - Each dataset included in separate overlays that can be turned on or off independently
  - Base map controls to switch between different maps

To note, the instructions said to separate Part 1 (standard visualization) from Part 2 (tectonic plate visualization) but the starter code file had the optional sections included so I did it all in that one Javascript logic file.
When you load the live page, it'll look like this:
![leaflet-challenge-vis](https://github.com/user-attachments/assets/cb7aa16f-a423-49fb-9031-a72a121e9921)

Program Execution Instructions:
  - Download project files or clone repo to your computer
  - Open project folder in VSCode (This is the program I used to develop this project. You will also need the Live Server add-on for it)
  - Review the various files at your discretion
  - When ready, right click the html file in VSCode and open it with Live Server
  - As mentioned above, the visualization has different layers and base maps you can switch between at your discretion. You can also click on any circle or fault line on the map and view it's information

I hope the visualizations and code here prove to be insightful and helpful.

Some references were used during the development of this project:
The leaflet tile layer I used is called Stadia.AlidadeSmooth. Here is the site I found it on and where the code to define it came from:
https://leaflet-extras.github.io/leaflet-providers/preview/#filter=Stadia.AlidadeSmooth

Used code from here to help write the function that adds details to the map's legend:
https://codepen.io/haakseth/pen/KQbjdO
