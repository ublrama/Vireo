package org.tdl.vireo.model.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.tdl.vireo.enums.RecipientType;
import org.tdl.vireo.model.EmailTemplate;
import org.tdl.vireo.model.EmailWorkflowRule;
import org.tdl.vireo.model.SubmissionState;
import org.tdl.vireo.model.repo.custom.EmailWorkflowRuleRepoCustom;

public interface EmailWorkflowRuleRepo extends JpaRepository<EmailWorkflowRule, Long>, EmailWorkflowRuleRepoCustom{
	public EmailWorkflowRule findBySubmissionStateAndRecipientTypeAndEmailTemplate(SubmissionState submissionState, RecipientType recipientType, EmailTemplate emailTemplate);
}