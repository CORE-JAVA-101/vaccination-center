package com.example.vaccinationcenter.dtos;

public class RegistrationRequestDto extends LoginRequestDto {
  private String name;

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }
}
