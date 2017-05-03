package hello;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class GreetingController {

	@MessageMapping("/{channel}/hello")
	@SendTo("/topic/greetings/{channel}")
	public Greeting greeting(@DestinationVariable String channel, HelloMessage message) throws Exception {

		log.info("HelloMessage=[{}]", message.getName());
		Thread.sleep(1000); // simulated delay
		return new Greeting("Hello, " + message.getName() + "!");
	}

	@MessageMapping("/{channel}/message")
	@SendToUser("/queue/{channel}")
	public NoGreeting greeting2(@DestinationVariable String channel, Hobby hobby) throws Exception {

		log.info("Hobby=[{}]", hobby.getHobby());
		Thread.sleep(1000); // simulated delay
		return new NoGreeting("fucking hobby, " + hobby.getHobby() + "!!!!");
	}
}
