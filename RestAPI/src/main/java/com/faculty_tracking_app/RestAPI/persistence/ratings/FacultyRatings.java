package com.faculty_tracking_app.RestAPI.persistence.ratings;

import lombok.Data;
import javax.persistence.*;

@Entity
@Data
@Table(name = "faculty_ratings")
public class FacultyRatings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rating_id;
    private Long u_id;
    private Long rating_value;
}
