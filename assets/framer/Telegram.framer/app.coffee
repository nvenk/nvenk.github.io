# Import file "Telegram"
sketch = Framer.Importer.load("imported/Telegram@1x")

Utils.globalLayers(sketch)

artboardWidth = 1440
# Framer.Device.contentScale = (Screen.width / artboardWidth)

# Setting Globals
Framer.Defaults.Animation = 
	time: 0.8
	curve:'cubic-bezier(.6,.04,.28,.97)'

background = new BackgroundLayer
	backgroundColor: '#ebebeb'
plane.x = -1500
title.props =
	y: 900
	opacity: 0
	scale: 0.7

# Plane Path - Hidden
planeCanvas = new Layer
	backgroundColor: "transparent"
	height: 564
	width: 1007
	x: -283
	y: 750
	clip: false
planeCanvas.html ='<svg id="planeContainer" style="height:564px; width:1007px;"></svg>'

snapPlane = Snap(planeCanvas.querySelector("#planeContainer"))

planePath = snapPlane.path("M0.00016036674,558.5 C-0.253305016,558.246535 300.000188,518 555.000187,378 C810.000185,238 1002.00018,0 1002.00018,0")

pathLength = planePath.getTotalLength()

planePath.attr
	stroke: "none"
	fill: "none"
	strokeDasharray: pathLength
	strokeDashoffset: pathLength

animHelpers = new Layer
	backgroundColor: 'transparent'
	visible: false
animHelpers.bringToFront()

bg.opacity = 0

# Defining Animation Helpers

# Logo Stroke Helper
strokeHelper = new Layer
	height: 50, width: 50
	parent: animHelpers
	y: 50

strokeHelper.states.add
	end:
		x: 100

# Plane Animation Helper
planeHelper = new Layer
	width: 50
	height: 50
	parent: animHelpers

planeHelper.states.add
	full: 
		x : 100

# Animation Helper Defaults
planeHelper.states.animationOptions =
	curve: "cubic-bezier(0.4, 0, 0.2, 1)"
	time: 1
strokeHelper.states.animationOptions =
	curve: "ease-in-out"
	time: 0.7

# Modulate all teh things!! 
planeHelper.on "change:x", (e) ->
	planePath.attr
		strokeDashoffset: Utils.modulate(e, [0,100], [pathLength,0], true)
		
	pointOnPath = planePath.getPointAtLength(Utils.modulate(e, [0,100],[0,pathLength], true) )
	plane.midX = pointOnPath.x - 820
	plane.midY = pointOnPath.y + 195

logo.height = 391
logo.width = 391
logoStrokeC = new Layer
	height: 391
	width: 391
	parent: logo
	backgroundColor: 'transparent'
	html: '<svg style="height:391px; width:391px;" id="logo-stroke"></svg>'
	rotationZ: -45
logoStrokeC.sendToBack()
bg.center()

snapLogo = Snap(logoStrokeC.querySelector("#logo-stroke"))

logoStroke = snapLogo.circle(195, 195, 187)
strokeLen = 1174.36 # Circle Circumference = 2 * 3.14 * radius (187)

logoStroke.attr
	fill: "none"
	stroke: "white"
	strokeWidth: 10
	strokeDasharray: strokeLen
	strokeDashoffset: strokeLen

strokeHelper.on "change:x", (e) ->
	logoStroke.attr
		strokeDashoffset: Utils.modulate(e, [0,100], [pathLength,0], true)

fabContainer = new Layer
	backgroundColor: 'transparent'
	parent: Telegram
	y: 335
	width: Screen.width + 2
	height: Screen.height - 335 - 192
	clip: true

fabContainer.placeBehind(navBar_bg)
fab.parent = fabContainer
fab.y -= 300

fab.states.add
	start:
		rotationZ: 360
		scale: 0
	inApp:
		rotationZ: 0
		scale: 1
	expand:
		scale: 19
fab.states.animationOptions =
	time: 0.4
	
fab.states.switchInstant('start')

pencil.states.add
	hide: opacity:0, scale: 0, rotationZ:-135
	show: opacity:1, scale: 1, rotationZ:0
pencil.states.animationOptions=
	delay:0
	time:0.1

pencil.states.switchInstant('hide')

fabBg = fab.copySingle()
fabBg.name = 'fabBg'
fabBg.parent = fabContainer
fabBg.html = '<svg id="fab-bg" style="height:242px; width: 242px;" fill="white"></svg>'
snapFab = Snap(fabBg.querySelector('#fab-bg'))
fabWhite = snapFab.circle(121,121,121)

fabBg.scale = 19
fabBg.states.add
	hide:
		opacity:0
	inApp:
		opacity:1

fabBg.states.animationOptions =
	time: 0.35
	delay: 0.05

fabBg.states.switchInstant('hide')

# States
notifBar.y = -100
notifBar.states.add
	inApp:
		y: 0

bottomBar.y = 2560
bottomBar.states.add
	inApp:
		y: 2370

navBar_bg.states.add
	start:
		y: 0
	inApp:
		y: -2230
navBar_bg.states.switchInstant('start')

logo.states.add
	inApp:
		scale: 0.4
		x:-70
		y:20

title.states.add
	inApp:
		scale: 0.9
		x: 200
		y: 185


scroll = ScrollComponent.wrap(convoGroup)
scroll.scrollHorizontal = false 
scroll.contentInset = 
	top: 40
	bottom: 222
scroll.on Events.Move, ->
	if scroll.scrollY <=0 then scroll.scrollY = 0
scroll.clip = false
scroll.content.clip = false

for child in scroll.content.children
	origY = child.y
	origH = child.height
	origW = child.width
	child.props = 
		y: -300
	child.states.add
		inApp:
			y: origY
			opacity: 1
		start:
			y: 0
		inactive:
			scale: 0.9
			opacity: 0.6
		active:
			scale: 1
			opacity: 1
		scale:
			scale: 1.05
# 			y: 0
		noHover:
			scale: 1
# 			y: origY
	child.states.animationOptions =
		time: child.index * 0.1
		curve: 'cubic-bezier(.59,.78,.71,1)'
	child.states.switchInstant('start')
	child.sendToBack()
# Set animation Time after fall-in for Conversations
#----------------------------------------------------

convoAnim = () ->
	for child in convoGroup.children
		child.states.switch('inApp')
	Utils.delay 0.8, ->
		for child in convoGroup.children
			child.states.animationOptions = 
				time: '0.3'
			
		


# Initial Animation Chain
#----------------------------

planeHelper.states.next()
Utils.delay 1.35, ->
	bg.animate
		properties:
			opacity: 1
		time: 0.8
	strokeHelper.states.next()
	
	Utils.delay 0.5, ->
		title.animate
			properties:
				y: 1026
				scale: 1
				opacity: 1
			time: 0.7
			curve: 'spring(100,15,10)'
		Utils.delay 1.5, ->
			navBar_bg.states.switch('inApp', time: 1)
			logo.states.switch('inApp', delay: 0.05)
			title.states.switch('inApp', delay: 0.1)
			notifBar.states.switch('inApp', delay: 0.2, time: 1)
			bottomBar.states.switch('inApp', delay: 0.2, time: 1)
			Utils.delay 0.35, ->
				convoAnim()
				Utils.delay 0.4, ->
					fab.states.switch('inApp', curve:"spring(100,15,10)")
					pencil.states.switch('show', time: 0.4, curve:"spring(100,15,10)")

# Skip Splash
#--------------------------
# planeHelper.states.next()
# bg.animate
# 	properties:
# 		opacity: 1
# 	time: 0
# strokeHelper.states.next()
# title.props =
# 	y: 1026
# 	scale: 1
# 	opacity: 1
# navBar_bg.states.switchInstant('inApp')
# logo.states.switchInstant('inApp')
# title.states.switchInstant('inApp')
# notifBar.states.switchInstant('inApp')
# bottomBar.states.switchInstant('inApp')
# for child in scroll.content.children
# 	child.states.switch('inApp')
# fab.states.switch('inApp', curve:"spring(100,15,10)")
# pencil.states.switch('show', time: 0.4, curve:"spring(100,15,10)")

# createBlock = (a) ->
clickBlock = new Layer
	backgroundColor: "transparent"
	height: scroll.content.height
	width: scroll.content.width
	parent: scroll.content
	name: 'clickBlock'

clickBlock.sendToBack()
# Block all clickthroughs
clickBlock.on Events.Click, ->
	return

clickBlock.states.add
	active:
		opacity: 1
	inactive:
		opacity: 1
	scale:
		opacity: 1
	inApp:
		opacity: 1

for child in scroll.content.children
	child.on Events.Click, ->
		if this.name != "clickBlock"
			this.bringToFront()
			this.states.next('scale','noHover')
			a = this
			if this.states.current == "scale"
				for a in this.siblings
					a.states.switch('inactive', time: '0.4')
				clickBlock.placeBehind(this)
			else if this.states.current == "noHover"
				for a in this.siblings
					a.states.switch('active', time: '0.4')
				clickBlock.sendToBack()

fab.on Events.Click, ->
	pencil.states.next('hide', 'show')
	fab.states.next('expand', 'inApp')
	fabBg.states.next('inApp','hide')
	if fab.states.current == "expand"
		pencil.states.animationOptions=
			delay:0.3
			time:0.1
	else
		pencil.states.animationOptions=
			delay:0
			time:0.1
	