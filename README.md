#Demo 
https://determined-tesla-0063a7.netlify.com/
# Code
-You can find all of the code at
https://github.com/Bryce-Soghigian/react-planetary.git

#Author
- Bryce Soghigian
- Link to my Github with all my other coding projects
https://github.com/Bryce-Soghigian

# Key Features

- v1.0 (current)
	- Can Import all Planets into your application
      
- v1.1 (next)
	- Can pass props to all of the planets (orbital_controls=bool, size=num rotation etc etc)
	
- v1.2 (future)
	- Can import all planets into the same canvas and adjust their positions


## How to use
```
npm i react-planetary || yarn add react-planetary
```

```javascript
import {Earth, Uranus, Mars,Venus, Mercury,Moon, Jupiter,Neptune,Saturn} from 'react-planetary/index'
```
- then just call the react component 

```javascript
<Earth/>
```
## Components(version 1.0.0)
- Note all props are optional
- Earth (Props: size) <img src="./Earth.png"/>
- Moon (Props size) <img src="./Moon.png"/>
- Mercury (Props: size) <img src="./Mercury.png"/>
- Venus (Props: size) <img src="./Venus.png">
- Neptune (Props: size) <img src="./Neptune.png"/>
- Jupiter (Props: size) <img src="./Jupiter.png"/>
- Mars (Props: size) <img src="Mars.png"/>
### Experiemental Components 
- Uranus <Uranus/>
- Saturn <Saturn/>
