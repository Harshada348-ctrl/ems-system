package net.javaguides.ems.backend.repository;

import net.javaguides.ems.backend.entities.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee , Long> {
    void deleteById(Long employeeId);
}
