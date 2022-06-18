package com.ujianjpa.relation.services;

import java.util.List;

import com.ujianjpa.relation.entity.PlotMataKuliah;

public interface ModelPlotMataKuliahInterface {
	
	public List<PlotMataKuliah> getAllPlotMataKuliah();
	
	public PlotMataKuliah addPlotMataKuliah (PlotMataKuliah plotMatkul);
	public PlotMataKuliah getPlotMataKuliahById(long id);
	public void deletePlotMataKuliah (long id);

}
