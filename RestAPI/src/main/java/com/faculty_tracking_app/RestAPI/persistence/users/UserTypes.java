package com.faculty_tracking_app.RestAPI.persistence.users;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table (name = "user_types")
public class UserTypes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long type_id;
    private String type_name;
}
