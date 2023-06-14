package com.example.vaccinationcenter.controllers;

import com.example.vaccinationcenter.entities.VaccinationCenter;
import com.example.vaccinationcenter.services.VaccinationCenterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("vaccinationcenter")
public class VaccinationCenterController {

  @Autowired
  private VaccinationCenterService vaccinationCenterService;

  @GetMapping("/{id}")
  public VaccinationCenter findVaccinationCenter(@PathVariable long id) {
    return vaccinationCenterService.getVaccinationCenter(id);
  }

  @GetMapping()
  public List<VaccinationCenter> findVaccinationCenters() {
    return vaccinationCenterService.getVaccinationCenters();
  }

  @PostMapping
  public VaccinationCenter addNewVaccinationCenter(@RequestBody VaccinationCenter vaccinationCenter) {
    return vaccinationCenterService.addOrUpdate(vaccinationCenter);
  }

  @PutMapping
  public VaccinationCenter updateVaccinationCenter(@PathVariable long id, @RequestBody VaccinationCenter vaccinationCenter) {
    vaccinationCenter.setId(id);
    return vaccinationCenterService.addOrUpdate(vaccinationCenter);
  }
}
