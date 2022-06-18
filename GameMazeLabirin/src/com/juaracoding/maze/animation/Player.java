package com.juaracoding.maze.animation;

public class Player {
	
	private String bentuk = "x";
	private int coordX = 1;
	private int coordY = 0;
	
	public Player(String bentuk, int coordX, int coordY) {
		this.bentuk = bentuk;
		this.coordX = coordX;
		this.coordY = coordY;
	}
	
	public Player() {

	}

	public String getBentuk() {
		return bentuk;
	}

	public void setBentuk(String bentuk) {
		this.bentuk = bentuk;
	}

	public int getCoordX() {
		return coordX;
	}

	public void setCoordX(int coordX) {
		this.coordX = coordX;
	}

	public int getCoordY() {
		return coordY;
	}

	public void setCoordY(int coordY) {
		this.coordY = coordY;
	}
	
	public void moveUp() {
		this.coordY--;
	}
	
	public void moveDown() {
		this.coordY++;
		
	}
	
	public void moveLeft() {
		this.coordX--;
		
	}
	
	public void moveRight() {
		this.coordX++;
	}
	

}
