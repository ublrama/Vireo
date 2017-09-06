package org.tdl.vireo.model.formatter;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import javax.persistence.Entity;

import org.tdl.vireo.model.Submission;
import org.tdl.vireo.util.FileHelperUtility;
import org.thymeleaf.context.Context;

@Entity
public class ProQuestUmiFormatter extends AbstractFormatter {

    public ProQuestUmiFormatter() {
        setName("ProQuestUMI");
        setTemplate("proquest_umi");
    }

    @Override
    public Context craftContext(Submission submission) {
        Context ctx = new Context(Locale.getDefault());

        ctx.setVariable("fileHelper", new FileHelperUtility());

        ctx.setVariable("submission", submission);

        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssz");
        ctx.setVariable("time", format.format(new Date()));

        ctx.setVariable("agent", "Vireo Proquest UMI packager");

        return ctx;
    }

}
