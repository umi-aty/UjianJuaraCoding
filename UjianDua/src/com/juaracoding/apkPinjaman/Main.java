package com.juaracoding.apkPinjaman;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Date;
import java.util.Scanner;


public class Main {
	
	static Scanner scan = new Scanner(System.in);
	static InputStreamReader data = new InputStreamReader(System.in);
	static BufferedReader br = new BufferedReader(data);
	
	static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
	static final String DB_URL = "jdbc:mysql://localhost/bankir";
	
	static Connection conn;
	static Statement stat;
	static ResultSet rs;
	
	public static void main (String [] args) {
		try {
			Class.forName(JDBC_DRIVER);
			conn = DriverManager.getConnection(DB_URL, "root", "");
			stat = conn.createStatement();
			while (!conn.isClosed()) {
				showMenu();
			}
			stat.close();
			conn.close();
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		
	}
	static void showMenu() {
		System.out.println("=================================");
		System.out.println("1. Masukkan Data");
		System.out.println("2. Tampilkan Data");
		System.out.println("3. Keluar");
		System.out.println("Masukkan Pilihan = ");
		try {
			int pil = Integer.parseInt(br.readLine());
			switch (pil) {
			case 1: {
				insertData();
				break;
			}
			case 2: {
				showData();
				break;
			}
			case 3: {
				System.exit(0);
				break;
			}
			default:
				throw new IllegalArgumentException("Unexpected value: " + pil);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	static void insertData() {
		try {
			
			System.out.print("ID Pinjaman = ");
			String id = br.readLine();

			Date date = new Date();
			System.out.println("Tanggal = "+date);
			System.out.print("Platfon = ");
			int platfon = Integer.parseInt(br.readLine());
			System.out.print("Bunga = ");
			double bunga = Double.parseDouble(br.readLine());
			System.out.print("Lama Pinjaman = ");
			int lamapinjaman = Integer.parseInt(br.readLine());
			double totalAngsuran = (platfon*((bunga/12)/(1-(1+(bunga/12)-lamapinjaman))));
			double angsuranPokok = (totalAngsuran-(bunga*lamapinjaman));
			double angsuranBunga = (bunga*lamapinjaman);
			double sisaPinjaman = (platfon-angsuranPokok);
			
			String qry = "INSERT INTO `pinjaman`(`id`,`platfon`, `bunga`, `lamapinjaman`) VALUES ('%s',%d,%f,%d)";
	        String sentence = "INSERT INTO `temppinjaman` (`id_pinjaman`,`totalAngsuran`, `angsuranPokok`, `angsuranBunga`, `sisaPinjaman`) VALUES (?,?,?,?,?)";

			qry = String.format(qry, id,platfon,bunga,lamapinjaman);
			
			PreparedStatement statement = conn.prepareStatement(sentence);
			statement.setString(1, id);
			statement.setDouble(2, totalAngsuran);
			statement.setDouble(3, angsuranPokok);
			statement.setDouble(4, angsuranBunga);
			statement.setDouble(5, sisaPinjaman);
			statement.executeUpdate();
			stat.execute(qry);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	static void showData() {
		String qry = "SELECT * FROM temppinjaman left join pinjaman on temppinjaman.id_pinjaman = pinjaman.id";
		try {
			rs = stat.executeQuery(qry);
			System.out.println("===== Data Pinjaman =====");
			while (rs.next()) {
				
				
				String id = rs.getString("id");
				int pinjaman = rs.getInt("platfon");
				int lamapinjaman = rs.getInt("lamapinjaman");
				double bunga = rs.getDouble("bunga");
				double totalAngsuran = rs.getDouble("totalAngsuran");
				double angsuranPokok = rs.getDouble("angsuranPokok");
				double angsuranBunga = rs.getDouble("angsuranBunga");
				double sisaPinjaman = rs.getDouble("sisaPinjaman");
				
				for (int i = 0; i<=lamapinjaman; i++) {
					System.out.println("Angsuran Ke-"+i);
					System.out.println(String.format("ID Pinjaman	: "+"%s", id));
					System.out.println(String.format("Pinjaman	: "+"%d", pinjaman));
					System.out.println(String.format("Bunga		: "+"%f", bunga));
					System.out.println(String.format("Total Angsuran	: "+"%f", totalAngsuran));
					System.out.println(String.format("Angsuran Pokok	: "+"%f", angsuranPokok));
					System.out.println(String.format("Angsuran Bunga	: "+"%f", angsuranBunga));
					System.out.println(String.format("Sisa Pinjaman	: "+"%f", sisaPinjaman));
					System.out.println("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
					
				}
				
			}
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
	}
	
}
