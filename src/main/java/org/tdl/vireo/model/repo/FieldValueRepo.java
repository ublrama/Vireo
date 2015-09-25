package org.tdl.vireo.model.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.tdl.vireo.model.FieldProfile;
import org.tdl.vireo.model.FieldValue;
import org.tdl.vireo.model.repo.custom.FieldValueRepoCustom;

@Repository
public interface FieldValueRepo extends JpaRepository<FieldValue, Long>, FieldValueRepoCustom {

	public FieldValue create(FieldProfile fieldProfile);
	
	public void delete(FieldValue fieldValue);
	
}