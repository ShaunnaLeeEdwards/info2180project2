//'use strict' is used to enter the strict mode. That is to ensure that all variables are declared before use
	"use strict";
	//Declaring variables to be used
	var div;
	var blink;
	var time;
	var blankY;
	var blankX;
	blankX = '300px';
	blankY = '300px';
	//The window.onload = function () is used to load the window before running the code
	windoww.onload = function ()
	{
		var puzzlearea = document.getElementById('puzzlearea');
		
		div = puzzlearea.getElementsByTagName('div');
	

		for (var i=0; i<div.length; i++)
		{
			div[i].style.backgroundImage="url('http://img09.deviantart.net/deb6/i/2013/160/d/f/lion_king_simba_base_by_xkelbix-d689mrx.png')";
			div[i].className = 'puzzlepiece';
			div[i].style.left = (i%4*100)+'px';
			div[i].style.top = (parseInt(i/4)*100) + 'px';
			div[i].style.backgroundPosition= '-' + div[i].style.left + ' ' + '-' + div[i].style.top;
			div[i].onmouseover = function()
			{
				if (checkCanMove(parseInt(this.innerHTML)))
				{
					this.style.border = "2px solid red";
					this.style.color = "#006600";
				}
			};
			div[i].onmouseout = function()
			{
				this.style.border = "2px solid black";
				this.style.color = "#000000";
			};
	

			div[i].onclick = function()
			{
				if (checkCanMove(parseInt(this.innerHTML)))
				{
					swap(this.innerHTML-1);
					if (checkFinish())
					{
						win();
					}
					return;
				}
			};
		}
	

		
		var shufflebutton = document.getElementById('shufflebutton');
		shufflebutton.onclick = function()
		{
	

			for (var i=0; i<250; i++)
			{
				var rand = parseInt(Math.random()* 100) %4;
				if (rand == 0)
				{
					var tmp = calculateUp(blankX, blankY);
					if ( tmp != -1)
					{
						swap(tmp);
					}
				}
				if (rand == 1)
				{
					var tmp = calculateDown(blankX, blankY);
					if ( tmp != -1) 
					{
						swap(tmp);
					}
				}
	

				if (rand == 2)
				{
					var tmp = calculateLeft(blankX, blankY);
					if ( tmp != -1)
					{
						swap(tmp);
					}
				}
	

				if (rand == 3)
				{
					var tmp = calculateRight(blankX, blankY);
					if (tmp != -1)
					{
						swap(tmp);
					}
				}
			}
		};
	

	function checkCanMove(pos)
	{
		if (calculateLeft(blankX, blankY) == (pos-1))
		{
			return true;
		}
	

		if (calculateDown(blankX, blankY) == (pos-1))
		{
			return true;
		}
	

		if (calculateUp(blankX, blankY) == (pos-1))
		{
			return true;
		}
	

		if (calculateRight(blankX, blankY) == (pos-1))
		{
			return true;
		}
	}
	function Blink()
	{
		blink --;
		if (blink == 0)
		{
			var body = document.getElementsByTagName('body');
			body[0].style.backgroundColor = "#FFFFFF";
			alert('Congratulations! You are the Winner! Continue playing because practice becomes perfect!');
			return;
		}
		if (blink % 2)
		{
			var body = document.getElementsByTagName('body');
			body[0].style.backgroundColor = "#ffff00";	
		}
		else
		{
			var body = document.getElementsByTagName('body');
			body[0].style.backgroundColor = "#0080ff";
		}
		time = setTimeout(Blink, 100);
	}
	

	

	

	function checkFinish()
	{
		var flag = true;
		for (var i = 0; i < div.length; i++) {
			var y = parseInt(div[i].style.top);
			var x = parseInt(div[i].style.left);
	

			if (x != (i%4*100) || y != parseInt(i/4)*100)
			{
				flag = false;
				break;
			}
		}
		return flag;
	}
	//Allow the tile next to the blank space to move into its position
	function swap (pos) {
		var current = div[pos].style.top;
		div[pos].style.top = blankY;
		blankY = current;
	

		current = div[pos].style.left;
		div[pos].style.left = blankX;
		blankX = current;
	}
	function calculateLeft(x, y)
	{
		var xx = parseInt(x);
		var yy = parseInt(y);
	

		if (xx > 0)
		{
			for (var i = 0; i < div.length; i++) 
			{
				if (parseInt(div[i].style.left) + 100 == xx && parseInt(div[i].style.top) == yy)
				{
					return i;
				} 
			}
		}
		else 
		{
			return -1;
		}
	}
	

	function calculateRight (x, y) {
		var xx = parseInt(x);
		var yy = parseInt(y);
		if (xx < 300)
		{
			for (var i =0; i<div.length; i++){
				if (parseInt(div[i].style.left) - 100 == xx && parseInt(div[i].style.top) == yy) 
				{
					return i;
				}
			}
		}
		else
		{
			return -1;
		} 
	}
	

	function calculateUp (x, y) {
		var xx = parseInt(x);
		var yy = parseInt(y);
		if (yy > 0)
		{
			for (var i=0; i<div.length; i++)
			{
				if (parseInt(div[i].style.top) + 100 == yy && parseInt(div[i].style.left) == xx) 
				{
					return i;
				}
			} 
		}
		else 
		{
			return -1;
		}
	}
	

	function calculateDown (x, y)
	{
		var xx = parseInt(x);
		var yy = parseInt(y);
		if (yy < 300)
		{
			for (var i=0; i<div.length; i++)
			{
				if (parseInt(div[i].style.top) - 100 == yy && parseInt(div[i].style.left) == xx) 
				{
					return i;
				}
			}
		}
		else
		{
			return -1;
		} 
	}
	function win()
	{
		var body = document.getElementsByTagName('body');
		body[0].style.backgroundColor = "#8000ff";
		blink = 10;
		time = setTimeout(Blink, 100);
	}
}