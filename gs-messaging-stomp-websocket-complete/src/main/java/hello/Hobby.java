package hello;

import lombok.Data;

@Data
public class Hobby {

	private String hobby;
	
	public Hobby() {
    }

    public Hobby(String hobby) {
        this.hobby = hobby;
    }
}
