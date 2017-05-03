package hello;

import lombok.Data;

@Data
public class NoGreeting {

	private String msg;
	
	public NoGreeting() {
    }

    public NoGreeting(String msg) {
        this.msg = msg;
    }
}
