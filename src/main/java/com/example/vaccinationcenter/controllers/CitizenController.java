package com.example.vaccinationcenter.controllers;

import com.example.vaccinationcenter.entities.Citizen;
import com.example.vaccinationcenter.entities.VaccinationCenter;
import com.example.vaccinationcenter.repository.CitizenRepository;
import com.example.vaccinationcenter.services.VaccinationCenterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("citizens")
public class CitizenController {

  @Autowired
  private CitizenRepository citizenRepository;

  @Autowired
  private VaccinationCenterService vaccinationCenterService;

  @GetMapping("/{id}")
  public Citizen findCitizen(@PathVariable long id) {
    return citizenRepository.findById(id).get();
  }

  @GetMapping()
  public List<Citizen> findCitizens() {
    List<Citizen> citizens = StreamSupport.stream(citizenRepository.findAll().spliterator(), false)
        .collect(Collectors.toList());

    return citizens;
  }

  @PostMapping
  public Citizen addCitizen(@RequestBody Citizen citizen)
  {
    return citizenRepository.save(citizen);
  }

  @PutMapping
  public Citizen updateCitizen(@PathVariable long id, @RequestBody Citizen citizen)
  {
    long centerId =citizen.getCenter().getId();
    VaccinationCenter vaccinationCenter = vaccinationCenterService.getVaccinationCenter(centerId);
    citizen.setCenter(vaccinationCenter);
    return citizenRepository.save(citizen);
  }

  @DeleteMapping("/{id}")
  public Boolean deleteCitizen(@PathVariable long id)
  {
    citizenRepository.deleteById(id);
    return true;
  }

  @GetMapping("/center/{centerId}")
  public List<Citizen> findByCenterId(@PathVariable long centerId){
    return citizenRepository.findAllByCenterId(centerId);
  }
}
