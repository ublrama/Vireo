package org.tdl.vireo.model.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.tdl.vireo.model.OrganizationCategory;
import org.tdl.vireo.model.repo.custom.OrganizationCategoryRepoCustom;

@Repository
public interface OrganizationCategoryRepo extends JpaRepository<OrganizationCategory, Long>, OrganizationCategoryRepoCustom {
	
	public OrganizationCategory findByNameAndLevel(String name, int level);

	public OrganizationCategory create(String name, int level);

	public void delete(OrganizationCategory organizationCategory);
	
}